const fs = require('fs');

const files = fs.readdirSync('./src/app/components').filter(f => f.endsWith('ConfigView.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(`./src/app/components/${file}`, 'utf-8');
  
  const badEnd = `          </div>\n        </div>\n          )}\n        </div>\n\n      {/* User Config Modal Overlay */}`;
  const goodEnd = `          </div>\n        </div>\n        )}\n      </div>\n\n      {/* User Config Modal Overlay */}`;
  
  if (content.includes(badEnd)) {
    content = content.replace(badEnd, goodEnd);
    fs.writeFileSync(`./src/app/components/${file}`, content);
    console.log(`Fixed ${file}`);
  }
});
