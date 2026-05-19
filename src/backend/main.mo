import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import MediaApi "mixins/media-api";
import Types "types/media";

actor {
  // Single mutable slot for the profile photo.
  let mediaState = { var profilePhoto : ?Types.ProfilePhoto = null };

  // Object-storage infrastructure (upload/download proxy).
  include MixinObjectStorage();

  // Profile photo API.
  include MediaApi(mediaState);
};
