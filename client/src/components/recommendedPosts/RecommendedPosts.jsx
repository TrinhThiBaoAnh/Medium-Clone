import "./recommendedPosts.css";
import RecommendedPost from "../../components/recommendedPost/RecommendedPost";
import React from "react";
export default function RecommendedPosts({ recommendedPosts }) {
    return (
        <div className="recommendedPosts">
          {recommendedPosts.map((p) => (
            <RecommendedPost recommendedPost={p} />
          ))}

        </div>
      );
}
