import { colors } from '@/styles/global';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type ConfirmDialogProps = Readonly<{
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  // Leave out for a single-button dialog (e.g. an OK message)
  onCancel?: () => void;
}>;

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = 'Delete',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dismiss = onCancel ?? onConfirm;
  const isDanger = variant === 'danger';

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={dismiss}
    >
      <Pressable style={styles.backdrop} onPress={dismiss}>
        <Pressable style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            {onCancel && (
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            )}
            <Pressable
              style={[
                styles.button,
                isDanger ? styles.dangerButton : styles.primaryButton,
              ]}
              onPress={onConfirm}
            >
              <Text
                style={isDanger ? styles.dangerText : styles.primaryText}
              >
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: {
    backgroundColor: colors.header,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  message: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.surface,
  },
  dangerButton: {
    backgroundColor: colors.alert,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  cancelText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  dangerText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
