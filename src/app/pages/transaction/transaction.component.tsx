'use client';
import React, { useState, useEffect } from 'react';
import TransactionModel from './transaction.model';
import api from './transaction.service';

const TransactionComponent: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await api.get('/transactions');
        const data = response.data.map((transaction: TransactionModel) => {
          new TransactionModel(
            transaction.idempotencyId,
            transaction.amount,
            transaction.type,
          );
        });
        setTransactions(data);
      } catch (error) {
        console.error('Erro ao obter transações:', error);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Lista de Transações</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.idempotencyId}>
            <strong>ID: </strong> {transaction.idempotencyId}{' '}
            <strong>Valor: </strong>
            {transaction.amount}, <strong>Tipo: </strong>
            {transaction.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionComponent;
