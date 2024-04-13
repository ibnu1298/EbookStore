import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { split } from "postcss/lib/list";

const url =
  "https://baretstorewebapi.azurewebsites.net/api/Ebook/GetMultipleEBookBySKU";

async function GetMultipleEBookBySKU(sku: Array<number>, token: any) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      sku,
    }),
  });

  if (res.status === 401) {
    return res;
  }
  if (!res.ok) {
    return res;
  }
  return res;
}

export async function GET(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const req = await request.json();
  let sku = req.sku.split(" ");

  sku = sku.map(function (item: any) {
    return parseInt(item, 10);
  });

  for (let i = 0; i < sku.length; i++) {
    if (0 % sku[i] !== 0) {
      sku.splice(i, 1);
    }
  }
  for (let i = 0; i < sku.length; i++) {
    if (0 % sku[i] !== 0) {
      sku.splice(i, 1);
    }
  }

  const res = await GetMultipleEBookBySKU(sku, authorization);
  const result = await res.json();

  try {
    if (res.status !== 401) {
      return NextResponse.json(result, { status: res.status });
    }
    return NextResponse.json(
      { isSucceeded: false, message: "Silakan Cek Kembali token" },
      { status: res.status }
    );
  } catch (error) {
    return NextResponse.json(
      { isSucceeded: false, message: "Coba cek route api path ini" },
      { status: 500 }
    );
  }
}
