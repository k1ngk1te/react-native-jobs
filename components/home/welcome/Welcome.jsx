import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const jobTypes = ['Full-Time', 'Part-Time', 'Contractor'];

const Welcome = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const [activeJobType, setActiveJobType] = React.useState('Full-time');

  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Emma</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={searchTerm}
            onChangeText={(value) => setSearchTerm(value)}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Image resizeMode="contain" source={icons.search} style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/search/${item}`);
                }}
                style={styles.tab(activeJobType, item)}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
