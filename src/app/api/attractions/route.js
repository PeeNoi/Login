import { NextResponse } from "next/server";
import { mysqlPool } from "@/app/utils/db";

export async function GET(request) {
  const promisePool = mysqlPool.promise()
  const [rows, fields] = await promisePool.query(
    `SELECT * FROM attractions;`
  )
  return NextResponse.json(rows)
}