import {NextRequest , NextResponse} from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req:NextRequest){
    const data1 = await req.json();

    await prisma.user.create({
        data: {
            username: data1.username,
            password: data1.password
           
          },
      })

      NextResponse.json({
        message: "signup succesfully"
      })
}



