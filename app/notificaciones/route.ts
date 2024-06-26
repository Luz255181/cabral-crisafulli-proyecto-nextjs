import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest } from "next/server";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(req: NextRequest) {
    const body = await req.json().then(data => data as {data: {id: string}});
    const payment = await new Payment(client).get({id: body.data.id})
    const pagar = {
        id: payment.id,
        amount: payment.transaction_amount,
        message: payment.description,
    }
    
    console.log("payment", payment);
    return Response.json({success: true})
}