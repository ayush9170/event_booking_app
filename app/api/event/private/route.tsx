
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
           Count : data.Count
          },
      })

      return NextResponse.json({
        message: "booked event successfully"
      })
  }

  export async function DELETE( req :NextRequest){
    const data = await req.json();
    await prisma.bOOKED_EVENT.deleteMany({
      where :{title : data.title}
    });

    return NextResponse.json({
      message: "Deleted successfully"
    })
  }