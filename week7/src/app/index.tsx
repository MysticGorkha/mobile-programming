
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

type Donation = {
  id: number;
  food: string;
  quantity: string;
  location: string;
  deadline: string;
  accepted: boolean;
};

const GREEN = "#237A50";
const CREAM = "#FFF9EF";
const DARK = "#26332B";

export default function Index() {
  const [screen, setScreen] = useState("home");
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");

  const [donations, setDonations] = useState<Donation[]>([
    {
      id: 1,
      food: "Vegetable Rice",
      quantity: "30 portions",
      location: "New Baneshwor",
      deadline: "5:00 PM",
      accepted: false,
    },
    {
      id: 2,
      food: "Vegetable Momo",
      quantity: "50 portions",
      location: "Koteshwor",
      deadline: "6:00 PM",
      accepted: false,
    },
  ]);

  function postDonation() {
    if (!food.trim() || !quantity.trim() || !location.trim() || !deadline.trim()) {
      Alert.alert("Missing details", "Please fill in all the fields.");
      return;
    }

    const newDonation: Donation = {
      id: Date.now(),
      food: food.trim(),
      quantity: quantity.trim(),
      location: location.trim(),
      deadline: deadline.trim(),
      accepted: false,
    };

    setDonations((previous) => [newDonation, ...previous]);

    setFood("");
    setQuantity("");
    setLocation("");
    setDeadline("");

    Alert.alert("Donation posted!", "Your food donation is now listed.");
    setScreen("nearby");
  }

  function acceptDonation(id: number) {
    setDonations((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, accepted: true } : item
      )
    );

    Alert.alert("Pickup accepted", "Thank you for helping save food!");
  }

  function Button({
    title,
    onPress,
    secondary = false,
  }: {
    title: string;
    onPress: () => void;
    secondary?: boolean;
  }) {
    return (
      <TouchableOpacity
        style={[styles.button, secondary && styles.secondaryButton]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.buttonText,
            secondary && styles.secondaryButtonText,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  function Field({
    label,
    value,
    onChangeText,
    placeholder,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
  }) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#89928B"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logo}>♡ Bachyo</Text>
        <Text style={styles.tagline}>बच्यो • Save Food. Share Hope.</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {screen === "home" && (
          <>
            <Text style={styles.heading}>Every meal matters.</Text>
            <Text style={styles.description}>
              Help good food reach people who need it instead of going to waste.
            </Text>

            <View style={styles.hero}>
              <Text style={styles.heroEmoji}>🥗</Text>
              <Text style={styles.heroTitle}>Give surplus food a purpose</Text>
              <Text style={styles.heroText}>
                A small action can make a big difference.
              </Text>
            </View>

            <Button
              title="+  Donate Surplus Food"
              onPress={() => setScreen("donate")}
            />

            <Button
              title="⌕  Find Nearby Donations"
              secondary
              onPress={() => setScreen("nearby")}
            />

            <Text style={styles.sectionTitle}>Our community impact</Text>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{donations.length}</Text>
                <Text style={styles.statLabel}>Listed</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>
                  {donations.filter((d) => d.accepted).length}
                </Text>
                <Text style={styles.statLabel}>Accepted</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>❤️</Text>
                <Text style={styles.statLabel}>Shared with care</Text>
              </View>
            </View>
          </>
        )}

        {screen === "donate" && (
          <>
            <Text style={styles.heading}>Donate food</Text>
            <Text style={styles.description}>
              Tell volunteers what food is available and when to collect it.
            </Text>

            <Field
              label="Food name"
              value={food}
              onChangeText={setFood}
              placeholder="e.g. Vegetable rice"
            />

            <Field
              label="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="e.g. 30 portions"
            />

            <Field
              label="Pickup location"
              value={location}
              onChangeText={setLocation}
              placeholder="e.g. New Baneshwor, Kathmandu"
            />

            <Field
              label="Pickup deadline"
              value={deadline}
              onChangeText={setDeadline}
              placeholder="e.g. Today, 5:00 PM"
            />

            <Button title="Post Donation" onPress={postDonation} />
            <Button
              title="Cancel"
              secondary
              onPress={() => setScreen("home")}
            />
          </>
        )}

        {screen === "nearby" && (
          <>
            <Text style={styles.heading}>Nearby donations</Text>
            <Text style={styles.description}>
              Find available food and help deliver it to someone in need.
            </Text>

            {donations.length === 0 && (
              <Text style={styles.description}>
                No donations have been posted yet.
              </Text>
            )}

            {donations.map((item) => (
              <View style={styles.card} key={item.id}>
                <Text style={styles.foodEmoji}>🍱</Text>
                <Text style={styles.cardTitle}>{item.food}</Text>
                <Text style={styles.cardText}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={styles.cardText}>
                  Location: {item.location}
                </Text>
                <Text style={styles.cardText}>
                  Collect by: {item.deadline}
                </Text>

                <Button
                  title={item.accepted ? "Pickup Accepted ✓" : "Accept Pickup"}
                  onPress={() => {
                    if (!item.accepted) {
                      acceptDonation(item.id);
                    }
                  }}
                  secondary={item.accepted}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={screen === "home" ? styles.navActive : styles.navText}>
            ⌂{"\n"}Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("donate")}>
          <Text style={screen === "donate" ? styles.navActive : styles.navText}>
            +{"\n"}Donate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("nearby")}>
          <Text
            style={screen === "nearby" ? styles.navActive : styles.navText}
          >
            ♧{"\n"}Nearby
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: CREAM,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: CREAM,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: GREEN,
  },
  tagline: {
    fontSize: 13,
    color: "#66756B",
    marginTop: 4,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 22,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 27,
    fontWeight: "800",
    color: DARK,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#66756B",
    marginBottom: 22,
  },
  hero: {
    backgroundColor: "#DDF3E4",
    padding: 22,
    borderRadius: 20,
    marginBottom: 20,
  },
  heroEmoji: {
    fontSize: 42,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: DARK,
    marginBottom: 8,
  },
  heroText: {
    fontSize: 14,
    color: "#52665A",
    lineHeight: 21,
  },
  button: {
    backgroundColor: GREEN,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 13,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#E8EFE9",
  },
  secondaryButtonText: {
    color: GREEN,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: DARK,
    marginTop: 18,
    marginBottom: 14,
  },
  stats: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: GREEN,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 11,
    color: "#66756B",
    textAlign: "center",
  },
  field: {
    marginBottom: 17,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: DARK,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE6DE",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: DARK,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3EAE4",
    padding: 18,
    borderRadius: 17,
    marginBottom: 16,
  },
  foodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: DARK,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#66756B",
    marginBottom: 7,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E3EAE4",
    paddingVertical: 12,
  },
  navText: {
    textAlign: "center",
    color: "#849087",
    fontSize: 12,
    lineHeight: 20,
  },
  navActive: {
    textAlign: "center",
    color: GREEN,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 20,
  },
});
