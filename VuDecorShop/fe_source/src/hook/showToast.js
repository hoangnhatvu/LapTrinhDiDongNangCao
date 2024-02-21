import {useToast} from 'react-native-toast-notifications';
import React, {useState, useEffect} from 'react';

export const useToastMessage = () => {
  const toast = useToast();
  const [lastToastContent, setLastToastContent] = useState('');

  const showToast = (content, type) => {
    if (content !== lastToastContent) {
      toast.show(content, {
        type: type,
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
        style: {borderRadius: 20},
      });
      setLastToastContent(content);
    }
  };

  return {showToast};
};
