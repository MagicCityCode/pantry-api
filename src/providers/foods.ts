import pool from "../db";
const readAll = () => pool.query("SELECT * FROM foods");
export default {
    readAll,
};