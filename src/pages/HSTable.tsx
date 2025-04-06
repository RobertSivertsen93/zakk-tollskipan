
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { hsCodeSections } from "@/data/hs-code-sections";

const HSTable = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">HS Codes - Harmonized System Nomenclature</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Section</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hsCodeSections.map((section) => (
              <TableRow key={section.section} className="hover:bg-muted/50">
                <TableCell className="font-medium">{section.section}</TableCell>
                <TableCell>{section.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HSTable;
