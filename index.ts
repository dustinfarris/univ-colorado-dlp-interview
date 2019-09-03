import * as aws from "@pulumi/aws";

// Create an AWS resource (S3 Bucket)
export const bucket = new aws.s3.Bucket("univ-colorado-dlp-interview", {
    bucket: "univ-colorado-dlp-interview",
    acl: "private",
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
            // Allow public directories to be viewed by anyone.
            {
                Effect: "Allow",
                Principal: "*",
                Action: ["s3:ListBucket", "s3:GetObject"],
                Resource: [
                    "arn:aws:s3:::univ-colorado-dlp-interview",
                    "arn:aws:s3:::univ-colorado-dlp-interview/*public*",
                ],
            },
            // Allow private directories to be viewed by William.
            //
            // Directories are located at s3://univ-colorado-dlp-interview/notpublic.
            // William's arn is: arn:aws:iam::123456789012:user/William
            //
            // He needs to be able to list the bucket contents and download files.

            // FILL ME IN
        ],
    }),
});

export const secretDocument = new aws.s3.BucketObject("finanical-report", {
    bucket: bucket,
    key: "notpublic/financial-report.csv",
    content: `Date,InMoney,OutMoney
6/23/2015,700000000,4
8/01/1997,98,315000
`,
});

export const publicDocument = new aws.s3.BucketObject("website", {
    bucket: bucket,
    key: "public/website.html",
    content: `<html>
<head>
<title>Welcome to the Web Site on the InterWeb</title>
</head>
<body>
<marquee>Come visit us and spend $$$!</marquee>
</body>
</html>
`,
});
