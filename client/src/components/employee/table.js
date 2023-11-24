"use client";
import Image from "next/image";
import { UpdateInvoice } from "./button";
// import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
// import InvoiceStatus from "@/app/ui/invoices/status";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
// import { fetchFilteredInvoices } from "@/app/lib/data";

export default function OrderTable({ typeTable, data }) {
  //   const invoices = await fetchFilteredInvoices(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="table">
            <thead>
              <tr>
                {typeTable.map((order) => {
                  return <th scope="col">{order}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data?.map((data) => {
                return (
                  <tr key={data?.employeeID}>
                    <td>{data?.fullName}</td>
                    <td>{data?.phoneNumber}</td>
                    <td>{data?.address.province}</td>
                    <td>{data?.role}</td>
                    <td>{data?.email}</td>
                    <td>
                      <UpdateInvoice id={data?.employeeID} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
