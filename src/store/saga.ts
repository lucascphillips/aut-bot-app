import { takeEvery, put } from "redux-saga/effects";
import {
  SESSION_SIGN_OUT,
  SESSION_LOAD,
  NOTIFICATION_SHOW,
  SessionLoadAction,
  NotificationShowAction
} from "Store/actions";
import { LOCAL_STORAGE_KEY } from "Store/slices/session";
import { log, warn, sleep, isDefined, setLocalStorage } from "Utility";
import { Access } from "Utility/types";
import { navigate } from "@reach/router";
import { hideNotification, showToast } from "Store/actions";

/**
 * Holds all async sagas dispatched from store actions
 */
export default function* saga() {
  yield takeEvery(SESSION_SIGN_OUT, signOut);
  yield takeEvery(SESSION_LOAD, loadNewSession);
  yield takeEvery(NOTIFICATION_SHOW, autoHideNotification);
}

/**
 * Upon sign out, clears session storage, shows a toast, and navigates to the home
 */
function* signOut() {
  navigate("/");
  setLocalStorage(LOCAL_STORAGE_KEY, "");
  yield put(showToast({ message: "Signed out" }));
}

/**
 * Saves the session token/metadata to local storage upon logging in
 * @param action The load session action dispatched upon token exchange success
 */
function loadNewSession(action: SessionLoadAction) {
  const { token, expiresIn } = action.payload.access;

  // Resolve expires at timing
  let expiresAt: Date | null = null;
  if (isDefined(expiresIn)) {
    const now = new Date();
    now.setSeconds(now.getSeconds() + expiresIn);
    expiresAt = now;
  }

  const access: Access = { token, expiresAt };
  const result: boolean = setLocalStorage(
    LOCAL_STORAGE_KEY,
    JSON.stringify(access)
  );
  if (result) {
    if (isDefined(expiresAt)) {
      log(`Saved session token that expires at ${expiresAt.toString()}`);
    } else {
      log("Saved indefinite session token");
    }
  } else {
    warn("Could not save session token to local storage");
  }
}

/**
 * Sets a timeout to automatically hide a notification after its `duration` parameter
 * has elapsed
 * @param action The show notification action dispatched upon notification display
 */
function* autoHideNotification(action: NotificationShowAction) {
  const { type, duration, id } = action.payload;
  if (duration > 0) {
    yield sleep(duration);
    yield put(hideNotification({ type, id }));
  }
}
