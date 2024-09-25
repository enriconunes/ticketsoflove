'use client'

import { useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TicketFormsProps {
  form: UseFormReturn<any>
  ticketCount: number
}

export default function TicketForms({ form, ticketCount }: TicketFormsProps) {
  const [openTicket, setOpenTicket] = useState<number | null>(null)
  const [tempTicketContent, setTempTicketContent] = useState("")

  useEffect(() => {
    const savedTickets = localStorage.getItem('ticketsOfLove')
    if (savedTickets) {
      const parsedTickets = JSON.parse(savedTickets)
      Object.entries(parsedTickets).forEach(([key, value]) => {
        if (key.startsWith('ticket_')) {
          form.setValue(key, value)
        }
      })
    }
  }, [form])

  const handleOpenTicket = (index: number) => {
    setOpenTicket(index)
    setTempTicketContent(form.getValues(`ticket_${index + 1}`) || "")
  }

  const handleCloseTicket = () => {
    setOpenTicket(null)
    setTempTicketContent("")
  }

  const handleSaveTicket = () => {
    if (openTicket !== null) {
      form.setValue(`ticket_${openTicket + 1}`, tempTicketContent)
      
      const allTickets = form.getValues()
      const ticketsToSave = Object.entries(allTickets)
        .filter(([key]) => key.startsWith('ticket_'))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      
      localStorage.setItem('ticketsOfLove', JSON.stringify(ticketsToSave))
      
      handleCloseTicket()
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {Array.from({ length: ticketCount }).map((_, index) => {
          const ticketValue = form.watch(`ticket_${index + 1}`)
          const isFilledOut = ticketValue && ticketValue.trim() !== ''

          return (
            <div
              key={index}
              className={`border-2 rounded aspect-square flex items-center justify-center cursor-pointer transition-colors ${
                isFilledOut ? 'border-[#228CDB] bg-[#228CDB] bg-opacity-20' : 'border-[#9C95DC]'
              }`}
              onClick={() => handleOpenTicket(index)}
            >
              <span className="text-lg font-semibold text-white">Dia {index + 1}</span>
            </div>
          )
        })}
      </div>

      <Dialog open={openTicket !== null} onOpenChange={handleCloseTicket}>
        <DialogContent className="sm:max-w-[425px] bg-[#170A1C] text-white border border-[#9C95DC]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center text-white">
              Bilhete para o {openTicket !== null ? openTicket + 1 : ''}º dia 💌
            </DialogTitle>
          </DialogHeader>
          <textarea
            value={tempTicketContent}
            onChange={(e) => setTempTicketContent(e.target.value)}
            className="w-full h-40 p-2 border-2 border-[#9C95DC] rounded resize-none focus:outline-none focus:border-[#228CDB] bg-[#170A1C] text-white placeholder-[#9C95DC]"
            placeholder="Escreva sua mensagem"
            maxLength={150}
          />
          <p className="text-sm text-[#9C95DC] mt-2">
            {tempTicketContent.length}/150 caracteres
          </p>
          <Button 
            onClick={handleSaveTicket} 
            className="w-full mt-4 bg-[#0B7189] hover:bg-[#228CDB] text-white transition-colors"
          >
            Salvar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}