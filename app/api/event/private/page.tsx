
import {NextRequest , NextResponse} from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth } from "@/component/auth";

const prisma = new PrismaClient()


export  async function GET(){
    const session = await auth();
  
      const user_event =   await prisma.events
      .findMany({
        where:{ userId : session?.user?.id},
      });
    
  
      return NextResponse.json({
        user_event
      })
  }