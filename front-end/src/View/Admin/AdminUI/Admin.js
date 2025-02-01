import React, { useState } from 'react';
import './Admin.css';
import Loans from '../AllLoans/AllLoans';
import MakeBill from '../MakeBill/MakeBill';
import AllBills from '../AllBills/AllBills';
import ThisWeek from '../ThisWeek/ThisWeek';
import TodayList from '../TodayList/TodayList';

function Admin() {
  const [showAllLoans, setShowAllLoans] = useState(false);
  const [showAllBills, setShowAllBills] = useState(false);
  const [showMakeBills, setShowMakeBills] = useState(true);
  const [showThisWeek, setShowThisWeek] = useState(false);
  const [showToday, setShowToday] = useState(false);
  let allLoansmask;

  if (showAllLoans) {
    allLoansmask = <Loans />;
  }
  if (showAllBills) {
    allLoansmask = <AllBills />;
  }
  if (showMakeBills) {
    allLoansmask = <MakeBill />;
  }
  if (showThisWeek) {
    allLoansmask = <ThisWeek />;
  }
  if (showToday) {
    allLoansmask = <TodayList />;
  }

  return (
    <div className="admin-container drop-right">
      <div className="admin-menu drop-up">
        <div
          className={`cards ${showMakeBills ? 'act' : ''}`}
          onClick={() => {
            setShowMakeBills(true);
            setShowAllLoans(false);
            setShowAllBills(false);
            setShowThisWeek(false);
            setShowToday(false);
          }}
        >
          <p>Make bills</p>
        </div>
        <div
          className={`cards ${showAllLoans ? 'act' : ''}`}
          onClick={() => {
            setShowAllLoans(true);
            setShowAllBills(false);
            setShowMakeBills(false);
            setShowThisWeek(false);
            setShowToday(false);
          }}
        >
          <p>All Loans</p>
        </div>
        <div
          className={`cards ${showAllBills ? 'act' : ''}`}
          onClick={() => {
            setShowAllLoans(false);
            setShowAllBills(true);
            setShowMakeBills(false);
            setShowThisWeek(false);
            setShowToday(false);
          }}
        >
          <p>Bills</p>
        </div>
        <div
          className={`cards ${showToday ? 'act' : ''}`}
          onClick={() => {
            setShowAllLoans(false);
            setShowAllBills(false);
            setShowMakeBills(false);
            setShowThisWeek(false);
            setShowToday(true);
          }}
        >
          <p>24 hours</p>
        </div>
        <div
          className={`cards ${showThisWeek ? 'act' : ''}`}
          onClick={() => {
            setShowAllLoans(false);
            setShowAllBills(false);
            setShowMakeBills(false);
            setShowThisWeek(true);
            setShowToday(false);
          }}
        >
          <p>This week</p>
        </div>
      </div>
      <div className="displayer">{allLoansmask}</div>
    </div>
  );
}

export default Admin;
