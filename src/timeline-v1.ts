import { CoreUserRaw, LegacyUserRaw, parseProfile, Profile } from './profile';
import { parseMediaGroups, reconstructTweetHtml } from './timeline-tweet-util';
import { PlaceRaw, Tweet } from './tweets';
import { isFieldDefined } from './type-util';

export interface Hashtag {
  text?: string;
}

export interface TimelineUserMentionBasicRaw {
  id_str?: string;
  name?: string;
  screen_name?: string;
}

export interface TimelineMediaBasicRaw {
  media_url_https?: string;
  type?: string;
  url?: string;
}

export interface TimelineUrlBasicRaw {
  expanded_url?: string;
  url?: string;
}

export interface ExtSensitiveMediaWarningRaw {
  adult_content?: boolean;
  graphic_violence?: boolean;
  other?: boolean;
}

export interface VideoVariant {
  bitrate?: number;
  url?: string;
}

export interface VideoInfo {
  variants?: VideoVariant[];
}

export interface TimelineMediaExtendedRaw {
  id_str?: string;
  media_url_https?: string;
  ext_sensitive_media_warning?: ExtSensitiveMediaWarningRaw;
  type?: string;
  url?: string;
  video_info?: VideoInfo;
  ext_alt_text: string | undefined;
}

export interface EditControlInitialRaw {
  edit_tweet_ids?: string[];
  editable_until_msecs?: `${number}`;
  edits_remaining?: `${number}`;
  is_edit_eligible?: boolean;
}

export interface SearchResultRaw {
  rest_id?: string;
  __typename?: string;
  core?: {
    user_results?: {
      result?: {
        is_blue_verified?: boolean;
        core?: CoreUserRaw;
        legacy?: LegacyUserRaw;
      };
    };
  };
  edit_control?: {
    edit_control_initial?: EditControlInitialRaw;
  };
  views?: {
    count?: string;
  };
  note_tweet?: {
    note_tweet_results?: {
      result?: {
        text?: string;
      };
    };
  };
  quoted_status_result?: {
    result?: SearchResultRaw;
  };
  legacy?: LegacyTweetRaw;
  article?: ArticleRaw;
}

export interface TimelineResultRaw {
  rest_id?: string;
  __typename?: string;
  edit_control?: {
    edit_control_initial?: EditControlInitialRaw;
  };
  core?: {
    user_results?: {
      result?: {
        __typename?: string;
        is_blue_verified?: boolean;
        core?: CoreUserRaw;
        legacy?: LegacyUserRaw;
      };
    };
  };
  views?: {
    count?: string;
  };
  note_tweet?: {
    note_tweet_results?: {
      result?: {
        text?: string;
      };
    };
  };
  quoted_status_result?: {
    result?: TimelineResultRaw;
  };
  legacy?: LegacyTweetRaw;
  tweet?: TimelineResultRaw;
  article?: ArticleRaw;
}

export interface ArticleRaw {
  article_results: {
    result: ArticleResultRaw;
  };
}

export interface ArticleResultRaw {
  rest_id: string;
  title: string;
  cover_media?: ArticleCoverMediaRaw;
  content_state: ArticleContentStateRaw;
  media_entities?: ArticleMediaEntityRaw[];
}

export interface ArticleCoverMediaRaw {
  media_key: string;
  media_info: {
    original_img_url: string;
  };
}

export interface ArticleContentStateRaw {
  blocks: ArticleBlockRaw[];
  entityMap: ArticleEntityRaw[];
}

export interface ArticleBlockRaw {
  key: string;
  text: string;
  type: string;
  inlineStyleRanges: {
    offset: number;
    length: number;
    style: string;
  }[];
  entityRanges: {
    key: number;
    offset: number;
    length: number;
  }[];
}

export interface ArticleEntityValueMediaItemRaw {
  localMediaId: string;
  mediaCategory: string;
  mediaId: string;
}

export interface ArticleEntityValueRaw {
  type: string;
  mutability?: string;
  data: {
    url?: string;
    entityKey?: string;
    mediaItems?: ArticleEntityValueMediaItemRaw[];
  };
}

export interface ArticleEntityRaw {
  key: number;
  value: ArticleEntityValueRaw;
}

export interface ArticleMediaEntityRaw {
  media_key: string;
  media_id: string;
  media_info: {
    __typename: 'ApiImage' | 'ApiGif' | 'ApiVideo';
    original_img_url: string;
  };
}

export interface LegacyTweetRaw {
  bookmark_count?: number;
  conversation_id_str?: string;
  created_at?: string;
  favorite_count?: number;
  full_text?: string;
  entities?: {
    hashtags?: Hashtag[];
    media?: TimelineMediaBasicRaw[];
    urls?: TimelineUrlBasicRaw[];
    user_mentions?: TimelineUserMentionBasicRaw[];
  };
  extended_entities?: {
    media?: TimelineMediaExtendedRaw[];
  };
  id_str?: string;
  in_reply_to_status_id_str?: string;
  place?: PlaceRaw;
  reply_count?: number;
  retweet_count?: number;
  retweeted_status_id_str?: string;
  retweeted_status_result?: {
    result?: TimelineResultRaw;
  };
  quoted_status_id_str?: string;
  time?: string;
  user_id_str?: string;
  ext_views?: {
    state?: string;
    count?: string;
  };
}

export interface TimelineGlobalObjectsRaw {
  tweets?: { [key: string]: LegacyTweetRaw | undefined };
  users?: { [key: string]: LegacyUserRaw | undefined };
}

export interface TimelineDataRawCursor {
  value?: string;
  cursorType?: string;
}

export interface TimelineDataRawEntity {
  id?: string;
}

export interface TimelineDataRawModuleItem {
  clientEventInfo?: {
    details?: {
      guideDetails?: {
        transparentGuideDetails?: {
          trendMetadata?: {
            trendName?: string;
          };
        };
      };
    };
  };
}

export interface TimelineDataRawAddEntry {
  content?: {
    item?: {
      content?: {
        tweet?: TimelineDataRawEntity;
        user?: TimelineDataRawEntity;
      };
    };
    operation?: {
      cursor?: TimelineDataRawCursor;
    };
    timelineModule?: {
      items?: {
        item?: TimelineDataRawModuleItem;
      }[];
    };
  };
}

export interface TimelineDataRawPinEntry {
  content?: {
    item?: {
      content?: {
        tweet?: TimelineDataRawEntity;
      };
    };
  };
}

export interface TimelineDataRawReplaceEntry {
  content?: {
    operation?: {
      cursor?: TimelineDataRawCursor;
    };
  };
}

export interface TimelineDataRawInstruction {
  addEntries?: {
    entries?: TimelineDataRawAddEntry[];
  };
  pinEntry?: {
    entry?: TimelineDataRawPinEntry;
  };
  replaceEntry?: {
    entry?: TimelineDataRawReplaceEntry;
  };
}

export interface TimelineDataRaw {
  instructions?: TimelineDataRawInstruction[];
}

export interface TimelineV1 {
  globalObjects?: TimelineGlobalObjectsRaw;
  timeline?: TimelineDataRaw;
}

export type ParseTweetResult =
  | { success: true; tweet: Tweet }
  | { success: false; err: Error };

function parseTimelineTweet(
  timeline: TimelineV1,
  tweetId: string,
): ParseTweetResult {
  const tweets = timeline.globalObjects?.tweets ?? {};
  const tweet: Readonly<LegacyTweetRaw> | undefined = tweets[tweetId];
  if (tweet?.user_id_str == null) {
    return {
      success: false,
      err: new Error(
        `Tweet "${tweetId}" was not found in the timeline object.`,
      ),
    };
  }

  const users = timeline.globalObjects?.users ?? {};
  const user: Readonly<LegacyUserRaw> | undefined = users[tweet.user_id_str];
  if (user?.screen_name == null) {
    return {
      success: false,
      err: new Error(`User "${tweet.user_id_str}" has no username data.`),
    };
  }

  const hashtags = tweet.entities?.hashtags ?? [];
  const mentions = tweet.entities?.user_mentions ?? [];
  const media = tweet.extended_entities?.media ?? [];
  const pinnedTweets = new Set<string | undefined>(
    user.pinned_tweet_ids_str ?? [],
  );
  const urls = tweet.entities?.urls ?? [];
  const { photos, videos, sensitiveContent } = parseMediaGroups(media);

  const tw: Tweet = {
    __raw_UNSTABLE: tweet,
    conversationId: tweet.conversation_id_str,
    id: tweetId,
    hashtags: hashtags
      .filter(isFieldDefined('text'))
      .map((hashtag) => hashtag.text),
    likes: tweet.favorite_count,
    mentions: mentions.filter(isFieldDefined('id_str')).map((mention) => ({
      id: mention.id_str,
      username: mention.screen_name,
      name: mention.name,
    })),
    name: user.name,
    permanentUrl: `https://x.com/${user.screen_name}/status/${tweetId}`,
    photos,
    replies: tweet.reply_count,
    retweets: tweet.retweet_count,
    text: tweet.full_text,
    thread: [],
    urls: urls
      .filter(isFieldDefined('expanded_url'))
      .map((url) => url.expanded_url),
    userId: tweet.user_id_str,
    username: user.screen_name,
    videos,
  };

  if (tweet.created_at) {
    tw.timeParsed = new Date(Date.parse(tweet.created_at));
    tw.timestamp = Math.floor(tw.timeParsed.valueOf() / 1000);
  }

  if (tweet.place?.id) {
    tw.place = tweet.place;
  }

  if (tweet.quoted_status_id_str) {
    tw.isQuoted = true;
    tw.quotedStatusId = tweet.quoted_status_id_str;

    const quotedStatusResult = parseTimelineTweet(
      timeline,
      tweet.quoted_status_id_str,
    );
    if (quotedStatusResult.success) {
      tw.quotedStatus = quotedStatusResult.tweet;
    }
  }

  if (tweet.in_reply_to_status_id_str) {
    tw.isReply = true;
    tw.inReplyToStatusId = tweet.in_reply_to_status_id_str;

    const replyStatusResult = parseTimelineTweet(
      timeline,
      tweet.in_reply_to_status_id_str,
    );
    if (replyStatusResult.success) {
      tw.inReplyToStatus = replyStatusResult.tweet;
    }
  }

  if (tweet.retweeted_status_id_str != null) {
    tw.isRetweet = true;
    tw.retweetedStatusId = tweet.retweeted_status_id_str;

    const retweetedStatusResult = parseTimelineTweet(
      timeline,
      tweet.retweeted_status_id_str,
    );
    if (retweetedStatusResult.success) {
      tw.retweetedStatus = retweetedStatusResult.tweet;
    }
  }

  const views = parseInt(tweet.ext_views?.count ?? '');
  if (!isNaN(views)) {
    tw.views = views;
  }

  if (pinnedTweets.has(tweet.id_str)) {
    // TODO: Update tests so this can be assigned at the tweet declaration
    tw.isPin = true;
  }

  if (sensitiveContent) {
    // TODO: Update tests so this can be assigned at the tweet declaration
    tw.sensitiveContent = true;
  }

  tw.html = reconstructTweetHtml(tweet, tw.photos, tw.videos);

  return { success: true, tweet: tw };
}

/**
 * A paginated tweets API response. The `next` field can be used to fetch the next page of results,
 * and the `previous` can be used to fetch the previous results (or results created after the
 * inital request)
 */
export interface QueryTweetsResponse {
  tweets: Tweet[];
  next?: string;
  previous?: string;
}

export function parseTimelineTweetsV1(
  timeline: TimelineV1,
): QueryTweetsResponse {
  let bottomCursor: string | undefined;
  let topCursor: string | undefined;
  let pinnedTweet: Tweet | undefined;
  let orderedTweets: Tweet[] = [];
  for (const instruction of timeline.timeline?.instructions ?? []) {
    const { pinEntry, addEntries, replaceEntry } = instruction;

    // Handle pin instruction
    const pinnedTweetId = pinEntry?.entry?.content?.item?.content?.tweet?.id;
    if (pinnedTweetId != null) {
      const tweetResult = parseTimelineTweet(timeline, pinnedTweetId);
      if (tweetResult.success) {
        pinnedTweet = tweetResult.tweet;
      }
    }

    // Handle add instructions
    for (const { content } of addEntries?.entries ?? []) {
      const tweetId = content?.item?.content?.tweet?.id;
      if (tweetId != null) {
        const tweetResult = parseTimelineTweet(timeline, tweetId);
        if (tweetResult.success) {
          orderedTweets.push(tweetResult.tweet);
        }
      }

      const operation = content?.operation;
      if (operation?.cursor?.cursorType === 'Bottom') {
        bottomCursor = operation?.cursor?.value;
      } else if (operation?.cursor?.cursorType === 'Top') {
        topCursor = operation?.cursor?.value;
      }
    }

    // Handle replace instruction
    const operation = replaceEntry?.entry?.content?.operation;
    if (operation?.cursor?.cursorType === 'Bottom') {
      bottomCursor = operation.cursor.value;
    } else if (operation?.cursor?.cursorType === 'Top') {
      topCursor = operation.cursor.value;
    }
  }

  if (pinnedTweet != null && orderedTweets.length > 0) {
    orderedTweets = [pinnedTweet, ...orderedTweets];
  }

  return {
    tweets: orderedTweets,
    next: bottomCursor,
    previous: topCursor,
  };
}

/**
 * A paginated profiles API response. The `next` field can be used to fetch the next page of results.
 */
export interface QueryProfilesResponse {
  profiles: Profile[];
  next?: string;
  previous?: string;
}

export function parseUsers(timeline: TimelineV1): QueryProfilesResponse {
  const users = new Map<string | undefined, Profile>();

  const userObjects = timeline.globalObjects?.users ?? {};
  for (const id in userObjects) {
    const legacy = userObjects[id];
    if (legacy == null) {
      continue;
    }

    const user = parseProfile(legacy);
    users.set(id, user);
  }

  let bottomCursor: string | undefined;
  let topCursor: string | undefined;
  const orderedProfiles: Profile[] = [];
  for (const instruction of timeline.timeline?.instructions ?? []) {
    for (const entry of instruction.addEntries?.entries ?? []) {
      const userId = entry.content?.item?.content?.user?.id;
      const profile = users.get(userId);
      if (profile != null) {
        orderedProfiles.push(profile);
      }

      const operation = entry.content?.operation;
      if (operation?.cursor?.cursorType === 'Bottom') {
        bottomCursor = operation?.cursor?.value;
      } else if (operation?.cursor?.cursorType === 'Top') {
        topCursor = operation?.cursor?.value;
      }
    }

    const operation = instruction.replaceEntry?.entry?.content?.operation;
    if (operation?.cursor?.cursorType === 'Bottom') {
      bottomCursor = operation.cursor.value;
    } else if (operation?.cursor?.cursorType === 'Top') {
      topCursor = operation.cursor.value;
    }
  }

  return {
    profiles: orderedProfiles,
    next: bottomCursor,
    previous: topCursor,
  };
}
