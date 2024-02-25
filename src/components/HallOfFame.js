import React, { useContext, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { WinnersContext } from '../App';
import './HallOfFame.css';

const HallOfFame = () => {
  const { history } = useContext(WinnersContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const stats = calculateStatistics();
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        label: 'Winners',
        labels: Object.keys(stats),
        datasets: [{
          data: Object.values(stats),
          backgroundColor: ['#ABE4ED', '#FF858D'],
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  

  const calculateStatistics = () => {
    const stats = { X: 0, O: 0 };
    history.forEach((winner) => {
      stats[winner.winner] += 1;
    });
    return stats;
  };

  return (
    <div className="hall-of-fame-container">
      <h2>Hall of Fame</h2>
      <div className="chart-container">
        <h3>Statistics</h3>
        <canvas ref={chartRef} />
      </div>
      <div className="hall-of-fame-table">
        <h3>Winners</h3>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {history.map((winner, index) => (
              <tr key={index}>
                <td>{winner.player}</td>
                <td>{winner.winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HallOfFame;
