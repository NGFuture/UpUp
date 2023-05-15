import { Button, Dialog, Portal, Text } from "react-native-paper";


const DialogModal = ({ visible, hideDialog,description, confirm, showCancelButton = true, title = "Attention" }) => {

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{description}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    {showCancelButton && <Button onPress={hideDialog}>Cancel</Button>}
                    <Button onPress={confirm}>
                        Ok
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );

};

export default DialogModal;
