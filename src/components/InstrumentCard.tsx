import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { Instrument } from '../types/Instrument';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from '../navigation/MainStackNavigator';
import { ChangeColor } from '../utils/ChangeColor';
import { useTheme } from '../utils/useTheme';

interface Props {
  instrument: Instrument;
  isSmall?: boolean;
  width: number;
  showAddButton?: boolean;
  onAdd?: () => void;
  favoriteButton?: boolean;
  onAddFavorite?: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Detail">;



const InstrumentCard = ({ instrument, isSmall = false, width, showAddButton = false, onAdd, favoriteButton = false, onAddFavorite }: Props) => {

  const colors = useTheme();

  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card}, isSmall && { padding: 14 }]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Detail', { id: instrument.id })}
    >

      {/* LEFT SIDE */}
      <View style={{ flex: 1, marginRight: 8 }}>
        <Text style={[styles.name, { color: colors.text }, isSmall && { fontSize: 15 }]} numberOfLines={1}>
          {instrument.name}
        </Text>
        <Text style={[styles.symbol, { color: colors.textSecondary }, isSmall && { fontSize: 13 }]} numberOfLines={1}>
          {instrument.symbol}
        </Text>
      </View>

      {/* RIGHT GROUP */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.right}>
          <Text style={[styles.price,{ color: colors.text }, isSmall && { fontSize: 15 }]} numberOfLines={1}>
            ${instrument.price.toFixed(2)}
          </Text>
          <Text
            style={[
              styles.change,
              { color: ChangeColor(instrument.change) },
              isSmall && { fontSize: 13 },
            ]}
            numberOfLines={1}
          >
            {instrument.change >= 0 ? '+' : ''}
            {instrument.change.toFixed(2)}%
          </Text>
        </View>

        {showAddButton && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onAdd}
            style={[styles.addButton, { backgroundColor: 'rgba(0, 200, 5, 0.12)' }]}
          >
            <Icon name="add" size={24} color={colors.button} />
          </TouchableOpacity>
        )}
        {favoriteButton && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onAddFavorite}
            style={[styles.favoriteButton, { backgroundColor: 'rgba(255, 59, 48, 0.12)' }]}
          >
            <Icon name="trash-outline" size={22} color="#FF3B30" />

          </TouchableOpacity>
        )}

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    fontSize: 14,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  change: {
    fontSize: 14,
    marginTop: 2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },

  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },

});

export default InstrumentCard;
