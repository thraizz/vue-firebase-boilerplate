#!/bin/bash

set -e

echo "🚀 Initializing Vue3 Firebase Template"
echo

# Get app name
read -p "Enter your app name: " app_name

if [ -z "$app_name" ]; then
    echo "❌ App name is required"
    exit 1
fi

echo
echo "📝 Updating configuration files for \"$app_name\"..."
echo

# Update package.json
if [ -f "package.json" ]; then
    sed -i.bak "s/\"vue3-firebase\"/\"$app_name\"/g" package.json && rm package.json.bak
    echo "✅ Updated package.json"
else
    echo "⚠️  package.json not found"
fi

# Update index.html
if [ -f "index.html" ]; then
    sed -i.bak "s/BOILERPLATE/$app_name/g" index.html && rm index.html.bak
    echo "✅ Updated index.html"
else
    echo "⚠️  index.html not found"
fi

# Update CLAUDE.md
if [ -f "CLAUDE.md" ]; then
    sed -i.bak "s/vue3-firebase/$app_name/g" CLAUDE.md && rm CLAUDE.md.bak
    echo "✅ Updated CLAUDE.md"
else
    echo "⚠️  CLAUDE.md not found"
fi

# Create project-specific README
if [ -f "README.template.md" ]; then
    sed "s/{{APP_NAME}}/$app_name/g" README.template.md > README.md
    rm README.template.md
    echo "✅ Created project README.md"
else
    echo "⚠️  README.template.md not found"
fi

echo
echo "🔥 Firebase Setup"
echo

read -p "Initialize Firebase project? (y/N): " init_firebase

if [[ "$init_firebase" =~ ^[Yy]$ ]]; then
    echo "🔄 Initializing Firebase..."
    if firebase init; then
        echo "✅ Firebase initialization completed"
        echo
        echo "📋 Next steps:"
        echo "1. Create a .env file with your Firebase config:"
        echo "   VITE_FIREBASE_API_KEY=your_api_key"
        echo "   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain"
        echo "   VITE_FIREBASE_PROJECT_ID=your_project_id"
        echo "   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket"
        echo "   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id"
        echo "   VITE_FIREBASE_APP_ID=your_app_id"
        echo "   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id"
        echo
        echo "2. Install dependencies: pnpm install"
        echo "3. Start development: pnpm dev"
    else
        echo "❌ Firebase initialization failed"
        exit 1
    fi
else
    echo
    echo "📋 To manually set up Firebase later:"
    echo "1. Run: firebase init"
    echo "2. Create .env file with Firebase config"
    echo "3. Install dependencies: pnpm install"
    echo "4. Start development: pnpm dev"
fi

echo
echo "🎉 Template initialized for \"$app_name\"!"