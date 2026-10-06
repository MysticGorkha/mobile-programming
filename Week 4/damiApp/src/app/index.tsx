import { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type MemoryType = 'Thing' | 'Reminder' | 'Event' | 'Note' | 'Voice' | 'Video';

type Memory = {
  id: string;
  title: string;
  description: string;
  location?: string;
  type: MemoryType;
  category: string;
  date: string;
  time?: string;
  recurring?: boolean;
  icon: string;
};

const initialMemories: Memory[] = [
  {
    id: '1',
    title: 'Passport',
    description: 'Important documents',
    location: 'Bedroom drawer, top section',
    type: 'Thing',
    category: 'Personal',
    date: 'Today',
    icon: '📍',
  },
  {
    id: '2',
    title: 'Call Client',
    description: 'Discuss the new video project',
    type: 'Reminder',
    category: 'Work',
    date: 'Today',
    time: '5:00 PM',
    icon: '🔔',
  },
  {
    id: '3',
    title: "Mom's Birthday",
    description: 'Buy a cake and call her',
    type: 'Event',
    category: 'Personal',
    date: 'Oct 18',
    recurring: true,
    icon: '🎂',
  },
  {
    id: '4',
    title: 'Video Idea',
    description: 'Create a VFX short about teleportation',
    type: 'Note',
    category: 'Ideas',
    date: 'Yesterday',
    icon: '📝',
  },
];

const types: MemoryType[] = [
  'Thing',
  'Reminder',
  'Event',
  'Note',
  'Voice',
  'Video',
];

const categories = [
  'Personal',
  'Work',
  'College',
  'Ideas',
  'Shopping',
  'Other',
];

export default function App() {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);

  const [screen, setScreen] = useState<
    'home' | 'search' | 'upcoming' | 'settings'
  >('home');

  const [darkMode, setDarkMode] = useState(true);

  const [search, setSearch] = useState('');

  const [showAdd, setShowAdd] = useState(false);

  const [selectedType, setSelectedType] =
    useState<MemoryType>('Thing');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Personal');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [recurring, setRecurring] = useState(false);

  const colors = darkMode ? darkColors : lightColors;

  const filteredMemories = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return memories;

    return memories.filter(memory =>
      `${memory.title} ${memory.description} ${memory.location} ${memory.category} ${memory.type}`
        .toLowerCase()
        .includes(query)
    );
  }, [search, memories]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setCategory('Personal');
    setDate('');
    setTime('');
    setRecurring(false);
    setSelectedType('Thing');
  };

  const addMemory = () => {
    if (!title.trim()) {
      Alert.alert('Missing title', 'Please tell Later what to remember.');
      return;
    }

    const icons: Record<MemoryType, string> = {
      Thing: '📍',
      Reminder: '🔔',
      Event: '🎂',
      Note: '📝',
      Voice: '🎙️',
      Video: '🎥',
    };

    const newMemory: Memory = {
      id: Date.now().toString(),
      title: title.trim(),
      description:
        description.trim() || 'No additional description',
      location: location.trim() || undefined,
      type: selectedType,
      category,
      date: date.trim() || 'Just now',
      time: time.trim() || undefined,
      recurring,
      icon: icons[selectedType],
    };

    setMemories(previous => [newMemory, ...previous]);

    resetForm();
    setShowAdd(false);
    setScreen('home');
  };

  const deleteMemory = (id: string) => {
    Alert.alert(
      'Delete memory?',
      'This memory will be removed from Later.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setMemories(previous =>
              previous.filter(memory => memory.id !== id)
            ),
        },
      ]
    );
  };

  const renderMemoryCard = (memory: Memory) => (
    <TouchableOpacity
      key={memory.id}
      activeOpacity={0.8}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
      onLongPress={() => deleteMemory(memory.id)}
    >
      <View
        style={[
          styles.cardIcon,
          { backgroundColor: colors.iconBackground },
        ]}
      >
        <Text style={styles.cardEmoji}>{memory.icon}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardTitleRow}>
          <Text
            style={[
              styles.cardTitle,
              { color: colors.text },
            ]}
            numberOfLines={1}
          >
            {memory.title}
          </Text>

          <Text
            style={[
              styles.cardDate,
              { color: colors.muted },
            ]}
          >
            {memory.date}
          </Text>
        </View>

        <Text
          style={[
            styles.cardDescription,
            { color: colors.muted },
          ]}
          numberOfLines={2}
        >
          {memory.description}
        </Text>

        {memory.location && (
          <Text
            style={[
              styles.cardLocation,
              { color: colors.muted },
            ]}
            numberOfLines={1}
          >
            📍 {memory.location}
          </Text>
        )}

        {memory.time && (
          <Text
            style={[
              styles.cardLocation,
              { color: colors.primary },
            ]}
          >
            ⏰ {memory.time}
          </Text>
        )}

        <View style={styles.badgeRow}>
          <View
            style={[
              styles.badge,
              { backgroundColor: colors.badge },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: colors.primary },
              ]}
            >
              {memory.type}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: colors.badge },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: colors.muted },
              ]}
            >
              {memory.category}
            </Text>
          </View>

          {memory.recurring && (
            <View
              style={[
                styles.badge,
                { backgroundColor: colors.badge },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: colors.muted },
                ]}
              >
                ↻ Repeats
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHome = () => {
    const today = memories.filter(
      memory =>
        memory.date.toLowerCase() === 'today'
    );

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.logo,
                { color: colors.text },
              ]}
            >
              later<span style={{ color: colors.primary }}>.</span>
            </Text>

            <Text
              style={[
                styles.subtitle,
                { color: colors.muted },
              ]}
            >
              Your external memory.
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.addButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={() => setShowAdd(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.searchBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setScreen('search')}
        >
          <Text style={styles.searchIcon}>⌕</Text>

          <Text
            style={[
              styles.searchPlaceholder,
              { color: colors.muted },
            ]}
          >
            Search your memories...
          </Text>
        </TouchableOpacity>

        <View
          style={[
            styles.hero,
            { backgroundColor: colors.hero },
          ]}
        >
          <Text style={styles.heroEmoji}>🧠</Text>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.heroTitle,
                { color: colors.text },
              ]}
            >
              Don't remember?
            </Text>

            <Text
              style={[
                styles.heroDescription,
                { color: colors.muted },
              ]}
            >
              Save it now. Find it later.
            </Text>
          </View>
        </View>

        {today.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                Today
              </Text>

              <Text
                style={[
                  styles.count,
                  { color: colors.muted },
                ]}
              >
                {today.length}
              </Text>
            </View>

            {today.map(renderMemoryCard)}
          </>
        )}

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Recent memories
          </Text>

          <Text
            style={[
              styles.count,
              { color: colors.muted },
            ]}
          >
            {memories.length}
          </Text>
        </View>

        {memories.slice(0, 5).map(renderMemoryCard)}

        <TouchableOpacity
          style={[
            styles.quickSave,
            {
              borderColor: colors.border,
              backgroundColor: colors.card,
            },
          ]}
          onPress={() => setShowAdd(true)}
        >
          <Text
            style={[
              styles.quickSavePlus,
              { color: colors.primary },
            ]}
          >
            +
          </Text>

          <View>
            <Text
              style={[
                styles.quickSaveTitle,
                { color: colors.text },
              ]}
            >
              Remember something
            </Text>

            <Text
              style={[
                styles.quickSaveSubtitle,
                { color: colors.muted },
              ]}
            >
              Save it in a few seconds
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderSearch = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.pageTitle,
          { color: colors.text },
        ]}
      >
        Search
      </Text>

      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          autoFocus
          value={search}
          onChangeText={setSearch}
          placeholder="Search anything..."
          placeholderTextColor={colors.muted}
          style={[
            styles.searchInput,
            { color: colors.text },
          ]}
        />
      </View>

      {search.length > 0 && (
        <Text
          style={[
            styles.resultText,
            { color: colors.muted },
          ]}
        >
          {filteredMemories.length} result
          {filteredMemories.length === 1 ? '' : 's'}
        </Text>
      )}

      {filteredMemories.map(renderMemoryCard)}

      {search.length > 0 &&
        filteredMemories.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>

            <Text
              style={[
                styles.emptyTitle,
                { color: colors.text },
              ]}
            >
              Nothing found
            </Text>

            <Text
              style={[
                styles.emptyText,
                { color: colors.muted },
              ]}
            >
              Try another word.
            </Text>
          </View>
        )}
    </ScrollView>
  );

  const renderUpcoming = () => {
    const upcoming = memories.filter(
      memory =>
        memory.type === 'Reminder' ||
        memory.type === 'Event'
    );

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text
          style={[
            styles.pageTitle,
            { color: colors.text },
          ]}
        >
          Upcoming
        </Text>

        <Text
          style={[
            styles.pageSubtitle,
            { color: colors.muted },
          ]}
        >
          Things you don't want to forget.
        </Text>

        {upcoming.map(renderMemoryCard)}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={() => {
            setSelectedType('Reminder');
            setShowAdd(true);
          }}
        >
          <Text style={styles.primaryButtonText}>
            + Add Reminder
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => {
            setSelectedType('Event');
            setShowAdd(true);
          }}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              { color: colors.text },
            ]}
          >
            + Add Event
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderSettings = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.pageTitle,
          { color: colors.text },
        ]}
      >
        Settings
      </Text>

      <View
        style={[
          styles.settingCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.settingTitle,
              { color: colors.text },
            ]}
          >
            Dark Mode
          </Text>

          <Text
            style={[
              styles.settingDescription,
              { color: colors.muted },
            ]}
          >
            Use a darker appearance
          </Text>
        </View>

        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{
            false: '#CCCCCC',
            true: colors.primary,
          }}
        />
      </View>

      <View
        style={[
          styles.settingCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.settingTitle,
              { color: colors.text },
            ]}
          >
            Memories
          </Text>

          <Text
            style={[
              styles.settingDescription,
              { color: colors.muted },
            ]}
          >
            {memories.length} memories saved
          </Text>
        </View>

        <Text style={{ fontSize: 24 }}>🧠</Text>
      </View>

      <View
        style={[
          styles.aboutBox,
          { backgroundColor: colors.hero },
        ]}
      >
        <Text style={styles.aboutLogo}>later.</Text>

        <Text
          style={[
            styles.aboutText,
            { color: colors.muted },
          ]}
        >
          Your external memory for things you
          don't want to forget.
        </Text>

        <Text
          style={[
            styles.version,
            { color: colors.muted },
          ]}
        >
          Version 1.0
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={
          darkMode ? 'light-content' : 'dark-content'
        }
      />

      {screen === 'home' && renderHome()}
      {screen === 'search' && renderSearch()}
      {screen === 'upcoming' && renderUpcoming()}
      {screen === 'settings' && renderSettings()}

      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: colors.nav,
            borderColor: colors.border,
          },
        ]}
      >
        <NavButton
          icon="⌂"
          label="Home"
          active={screen === 'home'}
          color={colors}
          onPress={() => setScreen('home')}
        />

        <NavButton
          icon="⌕"
          label="Search"
          active={screen === 'search'}
          color={colors}
          onPress={() => setScreen('search')}
        />

        <TouchableOpacity
          style={[
            styles.navAdd,
            { backgroundColor: colors.primary },
          ]}
          onPress={() => setShowAdd(true)}
        >
          <Text style={styles.navAddText}>+</Text>
        </TouchableOpacity>

        <NavButton
          icon="◷"
          label="Upcoming"
          active={screen === 'upcoming'}
          color={colors}
          onPress={() => setScreen('upcoming')}
        />

        <NavButton
          icon="⚙"
          label="Settings"
          active={screen === 'settings'}
          color={colors}
          onPress={() => setScreen('settings')}
        />
      </View>

      <Modal
        visible={showAdd}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAdd(false)}
      >
        <View
          style={[
            styles.modalBackground,
            { backgroundColor: colors.background },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  setShowAdd(false);
                }}
              >
                <Text
                  style={[
                    styles.cancelText,
                    { color: colors.muted },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.modalTitle,
                  { color: colors.text },
                ]}
              >
                Remember
              </Text>

              <TouchableOpacity onPress={addMemory}>
                <Text
                  style={[
                    styles.saveText,
                    { color: colors.primary },
                  ]}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.modalHeading,
                { color: colors.text },
              ]}
            >
              What do you want to remember?
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.typeScroll}
            >
              {types.map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedType(type)}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        selectedType === type
                          ? colors.primary
                          : colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color:
                          selectedType === type
                            ? '#FFFFFF'
                            : colors.muted,
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <FormLabel text="TITLE" color={colors.muted} />

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Buy camera battery"
              placeholderTextColor={colors.muted}
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            />

            <FormLabel text="DESCRIPTION" color={colors.muted} />

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add some details..."
              placeholderTextColor={colors.muted}
              multiline
              style={[
                styles.input,
                styles.multilineInput,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            />

            {selectedType === 'Thing' && (
              <>
                <FormLabel
                  text="WHERE IS IT?"
                  color={colors.muted}
                />

                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="e.g. Bedroom drawer"
                  placeholderTextColor={colors.muted}
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                />
              </>
            )}

            {(selectedType === 'Reminder' ||
              selectedType === 'Event') && (
              <>
                <FormLabel
                  text="DATE"
                  color={colors.muted}
                />

                <TextInput
                  value={date}
                  onChangeText={setDate}
                  placeholder="e.g. Tomorrow / Oct 18"
                  placeholderTextColor={colors.muted}
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                />

                <FormLabel
                  text="TIME"
                  color={colors.muted}
                />

                <TextInput
                  value={time}
                  onChangeText={setTime}
                  placeholder="e.g. 5:00 PM"
                  placeholderTextColor={colors.muted}
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                />

                {selectedType === 'Event' && (
                  <View style={styles.recurringRow}>
                    <View>
                      <Text
                        style={[
                          styles.settingTitle,
                          { color: colors.text },
                        ]}
                      >
                        Repeat every year
                      </Text>

                      <Text
                        style={[
                          styles.settingDescription,
                          { color: colors.muted },
                        ]}
                      >
                        Useful for birthdays & anniversaries
                      </Text>
                    </View>

                    <Switch
                      value={recurring}
                      onValueChange={setRecurring}
                      trackColor={{
                        false: '#CCCCCC',
                        true: colors.primary,
                      }}
                    />
                  </View>
                )}
              </>
            )}

            <FormLabel
              text="CATEGORY"
              color={colors.muted}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        category === item
                          ? colors.primary
                          : colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        category === item
                          ? '#FFFFFF'
                          : colors.muted,
                      fontSize: 12,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View
              style={[
                styles.mediaBox,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.mediaEmoji}>📎</Text>

              <Text
                style={[
                  styles.mediaTitle,
                  { color: colors.text },
                ]}
              >
                Add Memory
              </Text>

              <Text
                style={[
                  styles.mediaDescription,
                  { color: colors.muted },
                ]}
              >
                Photo • Video • Voice
              </Text>

              <Text
                style={[
                  styles.mediaComing,
                  { color: colors.primary },
                ]}
              >
                Media support coming next
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={addMemory}
            >
              <Text style={styles.primaryButtonText}>
                Save to Later
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function NavButton({
  icon,
  label,
  active,
  color,
  onPress,
}: {
  icon: string;
  label: string;
  active: boolean;
  color: typeof darkColors;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.navButton}
      onPress={onPress}
    >
      <Text
        style={[
          styles.navIcon,
          {
            color: active
              ? color.primary
              : color.muted,
          },
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.navLabel,
          {
            color: active
              ? color.primary
              : color.muted,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function FormLabel({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <Text
      style={[
        styles.formLabel,
        { color },
      ]}
    >
      {text}
    </Text>
  );
}

const darkColors = {
  background: '#0B0B0F',
  card: '#17171F',
  nav: '#101016',
  border: '#292932',
  text: '#FFFFFF',
  muted: '#85858F',
  primary: '#7C6CFF',
  hero: '#181824',
  badge: '#242432',
  iconBackground: '#242430',
};

const lightColors = {
  background: '#F7F6FB',
  card: '#FFFFFF',
  nav: '#FFFFFF',
  border: '#E4E2EC',
  text: '#171720',
  muted: '#777782',
  primary: '#6C5CE7',
  hero: '#EDEAFF',
  badge: '#EFEDFF',
  iconBackground: '#F0EEFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -2,
  },

  subtitle: {
    fontSize: 13,
    marginTop: 1,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '300',
    marginTop: -3,
  },

  searchBox: {
    height: 56,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 26,
    color: '#85858F',
    marginRight: 9,
  },

  searchPlaceholder: {
    fontSize: 14,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  hero: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  heroEmoji: {
    fontSize: 35,
    marginRight: 15,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  heroDescription: {
    fontSize: 13,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  count: {
    fontSize: 12,
  },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },

  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cardEmoji: {
    fontSize: 20,
  },

  cardContent: {
    flex: 1,
  },

  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    marginRight: 5,
  },

  cardDate: {
    fontSize: 9,
  },

  cardDescription: {
    fontSize: 12,
    marginTop: 4,
  },

  cardLocation: {
    fontSize: 11,
    marginTop: 5,
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
    gap: 5,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: '600',
  },

  quickSave: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 18,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  quickSavePlus: {
    fontSize: 29,
    marginRight: 14,
  },

  quickSaveTitle: {
    fontSize: 14,
    fontWeight: '700',
  },

  quickSaveSubtitle: {
    fontSize: 11,
    marginTop: 3,
  },

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 75,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },

  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
  },

  navIcon: {
    fontSize: 22,
  },

  navLabel: {
    fontSize: 8,
    marginTop: 3,
  },

  navAdd: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navAddText: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '300',
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 5,
  },

  pageSubtitle: {
    fontSize: 13,
    marginBottom: 25,
  },

  resultText: {
    fontSize: 12,
    marginBottom: 12,
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },

  emptyEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  emptyText: {
    fontSize: 12,
    marginTop: 5,
  },

  primaryButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  secondaryButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },

  settingCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: '700',
  },

  settingDescription: {
    fontSize: 11,
    marginTop: 4,
  },

  aboutBox: {
    marginTop: 20,
    borderRadius: 20,
    padding: 22,
  },

  aboutLogo: {
    color: '#7C6CFF',
    fontSize: 28,
    fontWeight: '800',
  },

  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },

  version: {
    fontSize: 10,
    marginTop: 20,
  },

  modalBackground: {
    flex: 1,
  },

  modalContent: {
    padding: 20,
    paddingBottom: 50,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  cancelText: {
    fontSize: 13,
  },

  saveText: {
    fontSize: 13,
    fontWeight: '700',
  },

  modalHeading: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 22,
  },

  typeScroll: {
    marginBottom: 15,
  },

  typeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 7,
  },

  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  formLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
    marginTop: 17,
    marginBottom: 8,
  },

  input: {
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 13,
  },

  multilineInput: {
    height: 90,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 11,
    borderWidth: 1,
    marginRight: 7,
  },

  recurringRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mediaBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginTop: 25,
  },

  mediaEmoji: {
    fontSize: 30,
  },

  mediaTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },

  mediaDescription: {
    fontSize: 11,
    marginTop: 4,
  },

  mediaComing: {
    fontSize: 10,
    marginTop: 8,
  },
});