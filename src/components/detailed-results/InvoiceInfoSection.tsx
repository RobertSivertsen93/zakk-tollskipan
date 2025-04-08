
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { InvoiceDetails } from '@/types/results';
import { Calendar, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface InvoiceInfoSectionProps {
  invoice: InvoiceDetails;
  onUpdate: (invoice: InvoiceDetails) => void;
}

const formSchema = z.object({
  invoiceNumber: z.string().nonempty('Invoice number is required'),
  invoiceDate: z.string().nonempty('Invoice date is required'),
  dueDate: z.string().nonempty('Due date is required'),
  sender: z.string().nonempty('Sender is required'),
  reference: z.string().optional(),
  documentNumber: z.string().optional(),
  currency: z.string().optional(),
});

export const InvoiceInfoSection: React.FC<InvoiceInfoSectionProps> = ({
  invoice,
  onUpdate
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      sender: invoice.sender,
      reference: invoice.reference || '',
      documentNumber: invoice.documentNumber || '',
      currency: invoice.currency || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({
      ...invoice,
      ...values,
    });
  }

  // Update form when external invoice data changes
  React.useEffect(() => {
    form.reset({
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      sender: invoice.sender,
      reference: invoice.reference || '',
      documentNumber: invoice.documentNumber || '',
      currency: invoice.currency || '',
    });
  }, [invoice, form]);

  return (
    <Card className="border border-custom-gray-200 shadow-sm bg-white">
      <CardContent className="p-0">
        <div className="p-4 bg-custom-gray-50 border-b border-custom-gray-200">
          <h2 className="text-lg font-medium text-black">
            Invoice Information
          </h2>
        </div>
        <div className="p-6">
          <Form {...form}>
            <form onChange={form.handleSubmit(onSubmit)} className="space-y-0">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Invoice Number Field */}
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="text-sm text-custom-gray-700 required-field">
                          Invoice Number
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-custom-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">The unique identifier for this invoice</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input className="mt-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Document Number Field */}
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="text-sm text-custom-gray-700">
                          Document Number
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-custom-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">Reference number for this customs document</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input className="mt-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Invoice Date Field */}
                <FormField
                  control={form.control}
                  name="invoiceDate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="text-sm text-custom-gray-700 required-field">
                          Invoice Date
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-custom-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">The date when the invoice was issued</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            className="mt-1" 
                            type="date" 
                            {...field} 
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/3 h-4 w-4 text-custom-gray-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Due Date Field */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="text-sm text-custom-gray-700 required-field">
                          Due Date
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-custom-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">The date when the customs declaration is due</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            className="mt-1" 
                            type="date" 
                            {...field}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/3 h-4 w-4 text-custom-gray-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sender Field */}
                <FormField
                  control={form.control}
                  name="sender"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="text-sm text-custom-gray-700 required-field">
                          Sender
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-custom-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">The company or person sending the goods</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input className="mt-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currency Field */}
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="text-sm text-custom-gray-700">
                          Currency
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-custom-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">The currency used in the invoice</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input className="mt-1" placeholder="USD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Reference Field - Full width */}
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="text-sm text-custom-gray-700">
                          Reference / Notes
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-custom-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">Additional notes or reference information</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input className="mt-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
