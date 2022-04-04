import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './spinner';
import { feedQuery,searchQuery } from '../utils/data';
import {client} from '../client'
import MasnoryLayout from './MasnoryLayout';
export default function Feed() {

  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();


  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        console.log('pins----->',pins)
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        console.log('pins----->',data)
        setLoading(false);
      });
    }
  }, [categoryId]);







  if (loading) {
    return (
      //  ${ideaName} 
      <Spinner message={`We are addingideas to your feed!`} />
    );
  }

  return (
    <div>

      {pins && < MasnoryLayout pins={pins} />}



    </div>
  )
}
