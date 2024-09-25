// import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  children?: React.ReactNode;
  title: string;
  viewAll?: boolean;
}

const transactions = [
  {
    id: 1,
    name: "Spotify",
    amount: -15.0,
    status: "Processing",
    date: "Wed 1:00pm",
    category: "Subscriptions",
    icon: "🎵",
  },
  {
    id: 2,
    name: "Alexa Doe",
    amount: 88.0,
    status: "Success",
    date: "Wed 2:45am",
    category: "Deposit",
    icon: "👤",
  },
  {
    id: 3,
    name: "Figma",
    amount: -18.99,
    status: "Processing",
    date: "Tue 6:10pm",
    category: "Income",
    icon: "🎨",
  },
  {
    id: 4,
    name: "Fresh F&V",
    amount: -88.0,
    status: "Success",
    date: "Tue 12:15pm",
    category: "Groceries",
    icon: "FV",
  },
  {
    id: 5,
    name: "Sam Sulek",
    amount: -40.2,
    status: "Declined",
    date: "Tue 5:40am",
    category: "Food",
    icon: "👤",
  },
];

const Transactions = ({ children, title,viewAll=false }: Props) => {
  return (
    <div className="p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {viewAll?<ViewAll />:""}
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  transaction.icon === "🎵"
                    ? "bg-green-500"
                    : transaction.icon === "👤"
                      ? "bg-gray-400"
                      : transaction.icon === "🎨"
                        ? "bg-purple-500"
                        : "bg-gray-200 text-gray-700"
                }`}
              >
                {transaction.icon}
              </div>
              <div className="ml-3">
                <p className="font-medium">{transaction.name}</p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-medium ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.amount >= 0 ? "+$" : ""}
                {transaction.amount.toFixed(2)}
              </p>
              <div className="flex items-center mt-1">
                <span
                  className={`w-2 h-2 rounded-full mr-1 ${
                    transaction.status === "Success"
                      ? "bg-green-500"
                      : transaction.status === "Processing"
                        ? "bg-blue-500"
                        : "bg-red-500"
                  }`}
                ></span>
                <span className="text-xs text-gray-500">
                  {transaction.status}
                </span>
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    transaction.category === "Subscriptions"
                      ? "bg-blue-100 text-blue-800"
                      : transaction.category === "Deposit"
                        ? "bg-green-100 text-green-800"
                        : transaction.category === "Income"
                          ? "bg-green-100 text-green-800"
                          : transaction.category === "Groceries"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewAll = () => {
  return (
    <Link href={"/transactions"} className="text-blue-600 text-sm font-medium flex items-center">
      View all
      <ChevronRight className="w-4 h-4 ml-1" />
    </Link>
  );
};

export default Transactions;
