import pool from "../db/config.ts";

export async function createReservation({
    resource_id, 
    user_id, 
    start_date, 
    end_date
}: { resource_id: number, user_id: number, start_date: string, end_date: string }): Promise<string> {
    const db = await pool.connect();
    try {
        await db.queryObject({
            text: `INSERT INTO acce_reservations (resource_id, reserver_token, reservation_start, reservation_end) VALUES ($1, $2, $3, $4)`,
            args: [resource_id, user_id, start_date, end_date],
        });
        return "Reservation created";
    } catch (error) {
        console.error("Error creating reservation:", error);
        return "Reservation failed";
    } finally {
        db.release();
    }
}
export async function getReservations(session:boolean): Promise<string> {
    const db = await pool.connect();
    if (session){
        try {
            const result = await db.queryObject({
                text: `
                  SELECT
                    ar.reserver_token,
                    ar.resource_id, 
                    r.resource_name, 
                    r.resource_description, 
                    ar.reservation_start, 
                    ar.reservation_end 
                  FROM acce_reservations ar
                  INNER JOIN loot3ed_resources r ON ar.resource_id = r.resource_id
                `,
            });
            return JSON.stringify(result.rows);
        } catch (error) {
            console.error("Error getting reservations:", error);
            return "Error getting reservations";
        } finally {
            db.release();
        }
    }
    else {
        try {
            const result = await db.queryObject({
                text: `
                  SELECT 
                    ar.resource_id, 
                    r.resource_name, 
                    r.resource_description, 
                    ar.reservation_start, 
                    ar.reservation_end 
                  FROM acce_reservations ar
                  INNER JOIN loot3ed_resources r ON ar.resource_id = r.resource_id
                `,
              });
            return JSON.stringify(result.rows);
        } catch (error) {
            console.error("Error getting reservations:", error);
            return "Error getting reservations";
        } finally {
            db.release();
        }
    }
}

export async function createResource({
    resource_name, 
    resource_description
}: { resource_name: string, resource_description: string }): Promise<string> {
    const db = await pool.connect();
    try {
        await db.queryObject({
            text: `INSERT INTO loot3ed_resources (resource_name, resource_description) VALUES ($1, $2)`,
            args: [resource_name, resource_description],
        });
        return "Resource created";
    } catch (error) {
        console.error("Error creating resource:", error);
        return "Resource failed";
    } finally {
        db.release();
    }
}

export async function getResources(): Promise<string> {
    const db = await pool.connect();
    try {
        const result = await db.queryObject({
            text: `SELECT * FROM loot3ed_resources`,
        });
        return JSON.stringify(result.rows);
    } catch (error) {
        console.error("Error getting resources:", error);
        return "Error getting resources";
    } finally {
        db.release();
    }
}

export async function getUserReservarion(user_id: number): Promise<string> {
    const db = await pool.connect();
    try {
        const result = await db.queryObject({
            text: `
              SELECT 
                ar.resource_id, 
                r.resource_name, 
                r.resource_description, 
                ar.reservation_start, 
                ar.reservation_end 
              FROM acce_reservations ar
              INNER JOIN loot3ed_resources r ON ar.resource_id = r.resource_id
              WHERE ar.reserver_token = $1
            `,
            args: [user_id],
        });
        return JSON.stringify(result.rows);
    } catch (error) {
        console.error("Error getting user reservations:", error);
        return "Error getting user reservations";
    } finally {
        db.release();
    }
}