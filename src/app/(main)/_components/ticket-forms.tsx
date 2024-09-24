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
  // State to track which ticket is currently open in the dialog
  const [openTicket, setOpenTicket] = useState<number | null>(null)
  // State to hold the content of the currently edited ticket
  const [tempTicketContent, setTempTicketContent] = useState("")

  useEffect(() => {
    // Load saved tickets from local storage when the component mounts
    const savedTickets = localStorage.getItem('ticketsOfLove')
    if (savedTickets) {
      const parsedTickets = JSON.parse(savedTickets)
      Object.entries(parsedTickets).forEach(([key, value]) => {
        // Only set values for ticket fields, not for other form fields like password
        if (key.startsWith('ticket_')) {
          form.setValue(key, value)
        }
      })
    }
  }, [form])

  // Function to open a ticket for editing
  const handleOpenTicket = (index: number) => {
    setOpenTicket(index)
    setTempTicketContent(form.getValues(`ticket_${index + 1}`) || "")
  }

  // Function to close the ticket editing dialog
  const handleCloseTicket = () => {
    setOpenTicket(null)
    setTempTicketContent("")
  }

  // Function to save the edited ticket
  const handleSaveTicket = () => {
    if (openTicket !== null) {
      form.setValue(`ticket_${openTicket + 1}`, tempTicketContent)
      
      // Save all tickets to local storage
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
      {/* Grid to display all tickets */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {Array.from({ length: ticketCount }).map((_, index) => {
          const ticketValue = form.watch(`ticket_${index + 1}`)
          const isFilledOut = ticketValue && ticketValue.trim() !== ''

          return (
            <div
              key={index}
              className={`border-2 rounded aspect-square flex items-center justify-center cursor-pointer transition-colors ${
                isFilledOut ? 'border-green-500 bg-green-500 bg-opacity-20' : 'border-red-500'
              }`}
              onClick={() => handleOpenTicket(index)}
            >
              <span className="text-lg font-semibold">Dia {index + 1}</span>
            </div>
          )
        })}
      </div>

      {/* Dialog for editing a ticket */}
      <Dialog open={openTicket !== null} onOpenChange={handleCloseTicket}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Bilhete para o {openTicket !== null ? openTicket + 1 : ''}º dia 💌
            </DialogTitle>
          </DialogHeader>
          <textarea
            value={tempTicketContent}
            onChange={(e) => setTempTicketContent(e.target.value)}
            className="w-full h-40 p-2 border-2 border-red-500 rounded resize-none focus:outline-none bg-gray-800 text-white"
            placeholder="Escreva sua mensagem"
            maxLength={150}
          />
          <p className="text-sm text-gray-400 mt-2">
            {tempTicketContent.length}/150 caracteres
          </p>
          <Button onClick={handleSaveTicket} className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
            Salvar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}