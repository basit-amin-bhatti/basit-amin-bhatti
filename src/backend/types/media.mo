import Storage "mo:caffeineai-object-storage/Storage";

module {
  /// The single profile image record stored by the backend.
  public type ProfilePhoto = {
    blob : Storage.ExternalBlob;
    filename : Text;
    updatedAt : Int;
  };
};
