"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

export function PaymentPopupComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[3px] border-[#9687EC] font-semibold">Donate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name on card</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Card number</Label>
            <div className="relative">
              <Input id="number" placeholder="1234 5678 9012 3456" />
              <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiry">Expiry date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
        </div>
        <Button className="w-full" onClick={() => setIsOpen(false)}>
          Pay Now
        </Button>
      </DialogContent>
    </Dialog>
  )
}