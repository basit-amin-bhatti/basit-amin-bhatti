import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/media";
import MediaLib "../lib/media";

/// Mixin that exposes the public profile-photo API.
/// Requires the shared mutable state record to be injected.
mixin (state : { var profilePhoto : ?Types.ProfilePhoto }) {
  /// Upload or replace the single profile photo.
  public shared (_) func setProfilePhoto(
    blob : Storage.ExternalBlob,
    filename : Text,
  ) : async () {
    MediaLib.setProfilePhoto(state, blob, filename);
  };

  /// Return the current profile photo metadata (or null if none uploaded).
  public query func getProfilePhoto() : async ?Types.ProfilePhoto {
    MediaLib.getProfilePhoto(state);
  };
};
