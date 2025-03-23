import {NextRequest , NextResponse} from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth } from "@/component/auth";

const prisma = new PrismaClient()
// const session = await auth();

export async function POST(req:NextRequest){
   const data1 = await req.json();

    await prisma.events.create({
        data: {
           title: data1.title,
           description: data1.description,
           userId : data1.userId ,
           
          },
      })

    return NextResponse.json({
        message: "Event created Successfully"
      })
}


export async function GET( ){

  const events = await prisma.events.findMany() ;

  return NextResponse.json({
    events : events
  })
}







