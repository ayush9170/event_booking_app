
import {NextRequest , NextResponse} from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth } from "@/component/auth";

const prisma = new PrismaClient()


export  async function GET(){
    const session = await auth();
  
      const user_event =   await prisma.bOOKED_EVENT
      .findMany({
        where:{ userId : session?.user.id},
      });
    
  
      return NextResponse.json({
        user_event
      })
  }

  export async function POST(req :NextRequest){
       const data = await req.json();

       await prisma.bOOKED_EVENT.create({
        data: {
           title: data.title,
           description: data.description,
           userId : data.userId ,
           
          },
      })

      return NextResponse.json({
        message: "booked event successfully"
      })
  }