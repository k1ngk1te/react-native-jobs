import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import styles from './nearbyjobs.style';
import NearbyJobCard from '../../../components/common/cards/nearby/NearbyJobCard';
import { COLORS } from '../../../constants';
import useFetch from '../../../hook/useFetch';

const Nearbyjobs = () => {
  const [selectedJob, setSelectedJob] = React.useState('');
  const router = useRouter();

  const { data, error, isLoading } = useFetch('search', {
    query: 'React Native Developer',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          (data || []).map((item) => {
            return (
              <NearbyJobCard
                key={'nearby-job-' + item.job_id}
                job={item}
                handleNavigate={() => {
                  router.push(`/job-details/${item.job_id}`);
                }}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
