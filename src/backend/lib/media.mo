import Storage "mo:caffeineai-object-storage/Storage";
import Time "mo:core/Time";
import Types "../types/media";

module {
  /// Set (or replace) the single profile photo.
  public func setProfilePhoto(
    state : { var profilePhoto : ?Types.ProfilePhoto },
    blob : Storage.ExternalBlob,
    filename : Text,
  ) : () {
    state.profilePhoto := ?{
      blob;
      filename;
      updatedAt = Time.now();
    };
  };

  /// Retrieve the current profile photo, if any.
  public func getProfilePhoto(
    state : { var profilePhoto : ?Types.ProfilePhoto },
  ) : ?Types.ProfilePhoto {
    state.profilePhoto;
  };
};
