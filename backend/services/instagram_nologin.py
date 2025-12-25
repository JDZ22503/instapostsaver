#!/usr/bin/env python3
import sys
import json
import requests
import re

# ==========================================
# 🔑 GET YOUR KEY FROM: https://rapidapi.com/ugo_66/api/instagram-bulk-scraper-fastest
# This service handles the blocks and proxies for you.
# ==========================================
RAPID_API_KEY = "PASTE_YOUR_KEY_HERE"
# ==========================================

def get_instagram_media(url):
    try:
        match = re.search(r'/(?:p|reel|reels|tv)/([a-zA-Z0-9_-]+)', url)
        if not match:
            return {"success": False, "message": "Invalid Instagram URL"}
        
        shortcode = match.group(1)
        
        # PRO API: This uses a massive pool of residential IPs to bypass the 403 block.
        api_url = "https://instagram-bulk-scraper-fastest.p.rapidapi.com/post/info"
        querystring = {"shortcode": shortcode}
        
        headers = {
            "x-rapidapi-key": RAPID_API_KEY,
            "x-rapidapi-host": "instagram-bulk-scraper-fastest.p.rapidapi.com"
        }

        print(f"📡 Calling RapidAPI for {shortcode}...", file=sys.stderr)
        
        if RAPID_API_KEY == "PASTE_YOUR_KEY_HERE":
             return {"success": False, "message": "DEVELOPER: Please paste your RapidAPI Key in instagram_nologin.py"}

        response = requests.get(api_url, headers=headers, params=querystring, timeout=20)
        
        if response.status_code == 200:
            data = response.json()
            if "data" not in data:
                return {"success": False, "message": "Instagram says this post is private or doesn't exist."}
            
            post = data["data"]
            media_items = []
            
            # Handle Carousel
            if "edge_sidecar_to_children" in post:
                for edge in post["edge_sidecar_to_children"]["edges"]:
                    node = edge["node"]
                    media_items.append({
                        "type": "video" if node.get("is_video") else "image",
                        "url": node.get("video_url") if node.get("is_video") else node.get("display_url"),
                        "thumbnail": node.get("display_url")
                    })
            # Handle Single Video
            elif post.get("is_video"):
                media_items.append({"type": "video", "url": post.get("video_url"), "thumbnail": post.get("display_url")})
            # Handle Single Image
            else:
                media_items.append({"type": "image", "url": post.get("display_url")})

            return {
                "success": True,
                "id": shortcode,
                "type": "carousel" if len(media_items) > 1 else media_items[0]["type"],
                "metadata": {"title": post.get("edge_media_to_caption", {}).get("edges", [{}])[0].get("node", {}).get("text", "Instagram Media")},
                "media": media_items
            }

        return {"success": False, "message": f"API Error: {response.status_code}. Check your RapidAPI credits."}

    except Exception as e:
        return {"success": False, "message": f"Scraper Error: {str(e)}"}

if __name__ == "__main__":
    url = sys.argv[1]
    print(json.dumps(get_instagram_media(url)))