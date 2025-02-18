'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

// icons
import { CiFilter } from "react-icons/ci";

const categories = [
  "Mobilier (Chaises, Tables, Bureaux, Armoires)",
  "Fournitures de bureau (Stylos, Papier, Carnets, Tableaux blancs)",
  "Équipements électroniques (Ordinateurs, Imprimantes, Scanners, Écrans)",
  "Matériel réseau (Routeurs, Switchs, Modems, Câbles)",
  "Nettoyage & Entretien (Aspirateurs, Balais, Désinfectants)",
  "Cuisine & Restauration (Machines à café, Réfrigérateurs, Micro-ondes)",
  "Sécurité & Prévention (Caméras de surveillance, Extincteurs, Trousse de secours)",
  "Accessoires & Périphériques (Claviers, Souris, Casques, Clés USB)",
];

export function StockCategories({ selectedCategory, onCategoryChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:bg-gray-700">
        <Button variant="outline" className="bg-primary text-gray-100 hover:text-white">
          {selectedCategory || "Click to choose category"}
          <CiFilter className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max bg-primary text-gray-200">
        <DropdownMenuRadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
          {categories.map((category) => (
            <DropdownMenuRadioItem key={category} value={category} className="cursor-pointer text-gray-100">
              {category}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
