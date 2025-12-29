'use client';

import { useEffect } from 'react';

export default function LiveStockListener() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL;

    const url = `${baseUrl}/api/stock/updates`;

    console.log('Prøver at forbinde til:', url);

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📢 Live lager-opdatering modtaget:', data);

      // Vi sender et internt signal i browseren med de nye data
      const stockEvent = new CustomEvent('stockUpdate', { detail: data });
      window.dispatchEvent(stockEvent);
    };

    eventSource.onerror = (error) => {
      // console.error('SSE Forbindelsesfejl:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}
