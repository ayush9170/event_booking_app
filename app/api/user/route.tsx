import {NextRequest , NextResponse} from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req:NextRequest){
    const data1 = await req.json();

    await prisma.user.create({
        data: {
            email: data1.email,
            password: data1.password
           
          },
      })

    return NextResponse.json({
        message: "signup succesfully"
      })
}
