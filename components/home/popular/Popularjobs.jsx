import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

import styles from './popularjobs.style';
import PopularJobCard from '../../../components/common/cards/popular/PopularJobCard';
import { COLORS, SIZES } from '../../../constants';
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = React.useState('');
  const router = useRouter();

  const { data, error, isLoading } = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={() => {
                    setSelectedJob(item.job_id);
                    router.push(`/job-details/${item.job_id}`);
                  }}
                />
              );
            }}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
