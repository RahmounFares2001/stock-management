"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const BonDeSortie = forwardRef((props, ref) => {
  const printRef = useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Bon_De_Sortie.pdf");
  };

  // Expose the handleDownloadPdf function to the parent component
  useImperativeHandle(ref, () => ({
    downloadPdf: handleDownloadPdf,
  }));

  // get data
  const bonDeSortieData = useSelector((state) => state.ui.BonDeSortieData);
  const departmentName = bonDeSortieData[0].departmentName
  const itemName = bonDeSortieData[0].itemName
  console.log("itemName");
  console.log(itemName);
  const quantity = bonDeSortieData[0].quantity
  const code = bonDeSortieData[0].code


  return (
    <div className="h-dvh bg-gray-100 p-8 flex flex-col items-center absolute -z-50 opacity-0">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-bold text-gray-800">Bon De Sortie</h1>
              <p className="text-xs text-gray-600">{code}</p>
            </div>
            <div className="text-right flex flex-col gap-2">
              <h2 className="font-semibold text-sm">Algerie Telecom</h2>
              <p className="text-xs text-gray-600">
                Centre Ville Djelfa
                <br />
                Djelfa, Algerie
              </p>
            </div>
          </div>

          <div className="mb-8 flex justify-between">
            <div className="flex flex-col">
              <h3 className="font-semibold mb-4 text-sm">Transférer à:</h3>
              <p className="text-gray-700 text-xs">
                {departmentName} 
                <br />
                Algerie Telecom
              </p>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold mb-4 text-sm">Date:</h3>
              <p className="text-gray-700 text-xs">
                DATE:
                <br />
                BON N': 035/2025
              </p>
            </div>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Quantité</th>
                <th className="border p-2 text-right">Prix U</th>
                <th className="border p-2 text-right">Observation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td className="border p-2">{itemName}</td>
                <td className="border p-2 text-right">{quantity}</td>
                <td className="border p-2 text-right"></td>
                <td className="border p-2 text-right"></td>
              </tr>
            </tbody>
          </table>

          <div className="w-full flex justify-end pt-32 pb-40">
            <div className="w-40">
              <h1>Caché :</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BonDeSortie;