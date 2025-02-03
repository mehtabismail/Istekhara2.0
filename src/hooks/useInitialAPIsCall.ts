import {
  useLazyGetClientsQuery,
  useLazyGetVenuesQuery,
} from '@/services/modules/Common/dropdownLists';
import {useEffect, useState} from 'react';

const useInitialAPIsCall = () => {
  const [getVenues] = useLazyGetVenuesQuery();
  const [getClients] = useLazyGetClientsQuery();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeAPIs = async () => {
      setIsLoading(true);
      try {
        await Promise.all([getVenues({}), getClients({})]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error('Error initializing APIs:', err);
      }
    };

    initializeAPIs();
  }, [getVenues, getClients]);

  return {
    isLoading,
  };
};

export default useInitialAPIsCall;
