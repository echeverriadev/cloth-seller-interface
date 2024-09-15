"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, PlusIcon } from "@primer/octicons-react";
import { SalesMonthly } from "./interfaces/sales-monthly-response.dto";
import { formatDate } from "../../../utils/date/FormatDate";

const getSales = async (): Promise<SalesMonthly> => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const yearMonth = `${year}-${month}`;

  const data: SalesMonthly = await fetch(
    `https://cloth-seller.vercel.app/api/v1/sell/get-by-month/${yearMonth}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  return data;
};

export default function SalesSection() {
  const [sales, setSales] = useState<SalesMonthly | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("monthly");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await getSales();
        setSales(salesData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleFilter = () => {
    setFilter((prevFilter) =>
      prevFilter === "monthly" ? "weekly" : "monthly"
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!sales || (sales[filter] && sales[filter].length === 0)) {
    return (
      <h2 className="uppercase text-gray-700">
        No existen registros de ventas este{" "}
        {filter === "monthly" ? "mes" : "semana"}...
      </h2>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold leading-tight uppercase">
          sobre las ventas
        </h2>
        <div className="flex items-center">
          <button
            className="p-2 mr-2 bg-gray-400 rounded flex items-center
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            <PlusIcon size={16} className="mr-1" />
            Venta
          </button>
          <button
            onClick={handleFilter}
            className="p-2 bg-gray-400 rounded flex items-center
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            <CalendarIcon size={16} className="mr-1" />
            {filter}
          </button>
        </div>
      </div>

      {filter === "monthly" && (
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Marca
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Vendedor
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                {sales?.monthly.map((sale, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">
                        {sale.brand}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">
                        {sale.description}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">
                        {formatDate(sale.sellDate.toString())}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">
                        {sale.user.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                      <p className="text-gray-600 whitespace-no-wrap">
                        {sale.amount}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {filter === "weekly" &&
        sales?.weekly.map((week, index) => (
          <div
            key={index}
            className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
          >
            <p className="text-gray-600 mb-1">Semana n°: {week.week}</p>
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Marca
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Vendedor
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {week.items.map((sale, windex) => (
                    <tr key={windex}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {sale.brand}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {sale.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {formatDate(sale.sellDate.toString())}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {sale.user.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {sale.amount}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
}
