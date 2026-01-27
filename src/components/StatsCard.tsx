import React from 'react';
import {type  IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: number;
  icon: IconType;
  color: string;
  change: string;
}


const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change} vs mois dernier</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full"
            style={{ width: `${Math.min(value * 5, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;