'use client';

import { useState, useEffect } from "react";
import { CalendarIcon, PlusIcon } from "@primer/octicons-react";
import { Sale, SalesMonthly } from "./interfaces/sales-monthly-response.dto";
import { formatDate } from "../../../utils/date/FormatDate";

// Fetch sales data from API
const getSales = async (): Promise<SalesMonthly> => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const yearMonth = `${year}-${month}`;

  const response = await fetch(
    `https://cloth-seller.vercel.app/api/v1/sell/get-by-month/${yearMonth}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sales data");
  }
  return response.json();
};

// Function to render table rows
const renderTableRows = (sales: Sale[] | undefined) => {
  return (sales ?? []).map((sale, index) => (
    <tr key={index}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-600 whitespace-no-wrap">{sale.brand}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-600 whitespace-no-wrap">{sale.description}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-600 whitespace-no-wrap">{formatDate(sale.sellDate.toString())}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-600 whitespace-no-wrap">{sale.user.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
        <p className="text-gray-600 whitespace-no-wrap">{sale.amount}</p>
      </td>
    </tr>
  ));
};

export default function SalesSection() {
  const [sales, setSales] = useState<SalesMonthly | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("monthly");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await getSales();
        setSales(salesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  const handleFilterToggle = () => {
    setFilter((prevFilter) => (prevFilter === "monthly" ? "weekly" : "monthly"));
  };

  if (loading) {
    return <p>Cargando información de las ventas del mes...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (sales?.monthly.length === 0) {
    return (
      <h2 className="uppercase text-gray-700">
        No existen registros de ventas este mes...
      </h2>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold leading-tight uppercase">Sobre las ventas</h2>
        <div className="flex items-center">
          <button
            className="p-2 mr-2 bg-gray-400 rounded flex items-center font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            <PlusIcon size={16} className="mr-1" />
            Venta
          </button>
          <button
            onClick={handleFilterToggle}
            className="p-2 bg-gray-400 rounded flex items-center font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            <CalendarIcon size={16} className="mr-1" />
            {filter === "monthly" ? "mensual" : "semanal"}
          </button>
        </div>
      </div>

      {filter === "monthly" && (
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Marca</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descripción</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vendedor</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Monto</th>
                </tr>
              </thead>
              <tbody>{renderTableRows(sales?.monthly)}</tbody>
            </table>
          </div>
        </div>
      )}

      {filter === "weekly" &&
        sales?.weekly.map((week, index) => (
          <div key={index} className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <p className="text-gray-600 mb-1">Semana n°: {week.week}</p>
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Marca</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descripción</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vendedor</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Monto</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows(week.items)}</tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
}