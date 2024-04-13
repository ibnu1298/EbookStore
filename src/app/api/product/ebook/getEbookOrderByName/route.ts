import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url = "https://baretstorewebapi.azurewebsites.net/api/Ebook/OrderByName";

async function OrderByName(token: any) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
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
  const res = await OrderByName(authorization);
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
