import pool from "../db/config.ts";
import { Users } from "../types.ts";

export async function isAdmin(username:string): Promise<boolean> {
    const db = await pool.connect();
    try {
        const result = await db.queryObject({
            text: `SELECT * FROM acce_users WHERE username = $1`,
            args: [username],
        });
        if (result.rows.length === 0) {
            return false;
        }
        const user: Users = result.rows[0] as Users;
        if (user.role !== "administrator") {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error getting user:", error);
        return false;
    } finally {
        db.release();
    }
  }

export async function deleteReservation(id:string): Promise<string> {
    const db = await pool.connect();
    try {
        await db.queryObject({
            text: `DELETE FROM acce_reservations WHERE reservation_id = $1`,
            args: [id],
        });
        return "Reservation deleted";
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return "Error deleting reservation";
    } finally {
        db.release();
    }
}

export async function deleteResource(id:number): Promise<string> {
    const db = await pool.connect();
    try {
        await db.queryObject({
            text: `DELETE FROM loot3ed_resources WHERE resource_id = ${id}`,
        });
        return "Resource deleted";
    } catch (error) {
        console.error("Error deleting resource:", error);
        return "Error deleting resource";
    } finally {
        db.release();
    }
}