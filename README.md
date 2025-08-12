# Starla - AI-Powered Jewelry Image Analysis Backend

A Node.js backend application that leverages OpenAI's GPT-4o mini  model to automatically analyze jewelry images and extract detailed product information. The system uploads images to AWS S3, processes them with AI, and stores the results in a PostgreSQL database.

## Features

- **AI-Powered Image Analysis**: Uses OpenAI's GPT-4o mini  to automatically extract jewelry product details
- **Cloud Storage**: Secure image upload and storage using AWS S3
- **Database Management**: PostgreSQL database with Sequelize ORM for data persistence
- **RESTful API**: Express.js API endpoints for image upload and retrieval
- **Automatic Metadata Extraction**: Extracts category, title, description, and stone count from jewelry images

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Cloud Storage**: AWS S3
- **AI Integration**: OpenAI GPT-4 Vision API
- **File Upload**: Multer for handling multipart/form-data
- **Environment Management**: dotenv for configuration

##  Prerequisites

Before running this project, ensure you have:

- Node.js (v16 or higher)
- PostgreSQL database
- AWS S3 bucket
- OpenAI API key
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tejesh-Duvvuru/starla_baceknd.git
   cd starla_baceknd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   DB_USERNAME=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=your_postgres_host
   DB_TYPE=postgres
   PORT=80
   
   # AWS Configuration
   AWS_REGION=your_aws_region
   AWS_ACCESSKEY=your_aws_access_key
   AWS_SECRET_ACCESSKEY=your_aws_secret_key
   S3_BUCKET=your_s3_bucket_name
   
   # OpenAI Configuration
   OPEN_AI=your_openai_api_key
   ```

4. **Database Setup**
   - Ensure PostgreSQL is running
   - The application will automatically create the required tables on startup

##  Running the Application

### Development Mode
```bash
npm start
```
This runs the application with nodemon for automatic restarts during development.

### Production Mode
```bash
node index.js
```

The server will start on the configured port (default: 80) and you should see:
```
Postgres connected
sync user image table
Server running on 80
```

## API Endpoints

### 1. Health Check
- **GET** `/`
- **Response**: `"I am running"`
- **Description**: Basic health check endpoint

### 2. Upload Image
- **POST** `/user/upload`
- **Content-Type**: `multipart/form-data`
- **Body**: 
  - `image`: Image file (required)
- **Response**: 
  ```json
  {
    "result": true,
    "value": {
      "id": 1,
      "category": "Ring",
      "title": "Diamond Ring",
      "description": "Beautiful diamond ring with intricate design",
      "stone_count": "5",
      "signedUrl": "https://s3.amazonaws.com/..."
    }
  }
  ```

### 3. Get All Images
- **GET** `/user/images`
- **Response**: Array of all uploaded images with their metadata
- **Description**: Retrieves all stored image records


## How It Works

1. **Image Upload**: User uploads a jewelry image via the `/user/upload` endpoint
2. **S3 Storage**: Image is uploaded to AWS S3 with a unique filename
3. **AI Analysis**: OpenAI GPT-4o.mini analyzes the image and extracts:
   - Category (e.g., Ring, Necklace, Earrings)
   - Title (short product description)
   - Description (1-2 sentence detailed description)
   - Stone count (if visible)
4. **Data Storage**: Extracted information is stored in PostgreSQL database
5. **Response**: Returns the processed data with S3 signed URL

## Project Structure

```
starla/
├── db/
│   ├── config.js          # Database configuration
│   └── models/
│       └── userImages.js  # User image model and database operations
├── routes/
│   └── userImage.js       # API route handlers
├── helpers.js             # AWS S3 utility functions
├── index.js               # Main application entry point
├── package.json           # Project dependencies
└── README.md              # This file
```

##  Configuration

### Database Configuration (`db/config.js`)
- PostgreSQL connection with SSL support
- Environment variable-based configuration
- Automatic table synchronization

### AWS S3 Configuration (`helpers.js`)
- S3 client setup with credentials
- Presigned URL generation for secure access
- Automatic file key generation

### OpenAI Integration (`routes/userImage.js`)
- GPT-4.o mini model for image analysis
- Structured prompt for jewelry analysis
- JSON response parsing










