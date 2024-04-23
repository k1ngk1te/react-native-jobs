import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../hook/useFetch';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

function JobDetails() {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const [refreshing, setRefreshing] = React.useState(false);

  const params = useLocalSearchParams();
  const router = useRouter();

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useFetch('job-details', {
    job_id: params.id,
  });

  const data = React.useMemo(() => {
    if (response.length === 0) return null;
    return response[0];
  }, [response]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
  }, [refetch]);

  const displayTabContent = React.useCallback(() => {
    switch (activeTab) {
      case 'About':
        return <JobAbout info={data?.job_description ?? 'N/A'} />;
      case 'Qualifications':
        return (
          <Specifics
            title="Qualifications"
            points={data?.job_highlights?.Qualifications ?? ['N/A']}
          />
        );
      case 'Responsibilities':
        return (
          <Specifics
            title="Responsibilities"
            points={data?.job_highlights?.Responsibilities ?? ['N/A']}
          />
        );
      default:
        break;
    }
  }, [activeTab, data]);

  React.useEffect(() => {
    if (!isLoading) setRefreshing(false);
  }, [isLoading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />,
          headerTitle: '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading && !data ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wront</Text>
          ) : !data ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data.employer_logo}
                companyName={data.employer_name}
                jobTitle={data.job_title}
                location={data.job_country}
              />

              <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        {data && (
          <JobFooter url={data?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
        )}
      </>
    </SafeAreaView>
  );
}

export default JobDetails;
