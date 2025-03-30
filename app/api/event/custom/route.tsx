import {NextRequest , NextResponse} from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth } from "@/component/auth";

const prisma = new PrismaClient()


export  async function GET(req:NextRequest){
    const title = req.nextUrl.searchParams.get('title');
    const session = await auth();
  
      const event =   await prisma.bOOKED_EVENT
      .findFirst({
        where:{ title: title as string,
            userId :session?.user.id
         },
      });
    
  
      return NextResponse.json({
        event
      })
  }